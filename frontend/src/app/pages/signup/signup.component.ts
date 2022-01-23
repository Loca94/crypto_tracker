import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {

  constructor() { }

  signupForm = new FormGroup({
    email: new FormControl('', Validators.nullValidator && Validators.required),
    password: new FormControl('', Validators.nullValidator && Validators.required),
    confirmPassword: new FormControl('', Validators.nullValidator && Validators.required)
  });

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    console.log(this.signupForm.value);
    if (this.signupForm.valid && this.passwordsMatch()) {
      console.log('Form is valid');
    } else {
      console.log('Form is invalid');
    }
  }
  
  private passwordsMatch() {
    return this.signupForm.value.password === this.signupForm.value.confirmPassword;
  }
}
