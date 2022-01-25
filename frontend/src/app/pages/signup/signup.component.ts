import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../core/services/subject.service";
import {User} from "../../models/User";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {

  constructor(private subjectService: SubjectService) { }

  signupForm = new FormGroup({
    email: new FormControl('', Validators.nullValidator && Validators.required),
    password: new FormControl('', Validators.nullValidator && Validators.required),
    confirmPassword: new FormControl('', Validators.nullValidator && Validators.required)
  });

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    if (this.signupForm.valid && this.passwordsMatch()) {
      console.log('Form is valid');
      
      // TODO: fare chiamata api auth/signup, passando email e password
      
      let user: User = {
        id: null,
        email: this.signupForm.value.email,
        password: this.signupForm.value.password,
        cognitoUserId: 'something',
        coinMonitored: [],
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      this.subjectService.setUser(user);
      console.log('ho settato lo user nel service')
    } else {
      console.log('Form is invalid');
    }
  }
  
  private passwordsMatch() {
    return this.signupForm.value.password === this.signupForm.value.confirmPassword;
  }
}
