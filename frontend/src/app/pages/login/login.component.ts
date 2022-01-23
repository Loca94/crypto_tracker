import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../core/services/auth.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  userForm = new FormGroup({
    email: new FormControl('', Validators.nullValidator && Validators.required),
    password: new FormControl('', Validators.nullValidator && Validators.required)
  });

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.authService.login(this.userForm.value).subscribe(
        () => {
          this.userForm.reset();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

}
