import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {
  showErrorMessage: boolean = false;
  errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthService,
  ) { }

  loginForm = new FormGroup({
    email: new FormControl('', Validators.nullValidator && Validators.required),
    password: new FormControl('', Validators.nullValidator && Validators.required)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value.email, this.loginForm.value.password).subscribe(
        () => {
          this.showErrorMessage = false;
          this.loginForm.reset();
          this.goToHome();
        },
        error => {
          console.log(error);
          this.showErrorMessage = true;
          this.errorMessage = error.error.errorMessage ? error.error.errorMessage : error.error;
        }
      );
    }
  }
  
  private goToHome() {
    this.router.navigate(['/home']);
  }
}
