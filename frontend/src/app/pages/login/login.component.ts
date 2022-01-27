import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SubjectService} from "../../core/services/subject.service";

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
    private subjectService: SubjectService
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
        (res) => {
          console.log({res});
          this.showErrorMessage = false;
          this.subjectService.setUser(res.user);
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
