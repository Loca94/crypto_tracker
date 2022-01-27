import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SubjectService} from "../../core/services/subject.service";
import {User} from "../../models/User";
import {AuthService} from "../../core/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [
  ]
})
export class SignupComponent implements OnInit {
  showErrorMessage: boolean = false;
  errorMessage: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private subjectService: SubjectService
  ) { }

  signupForm = new FormGroup({
    username: new FormControl('', [Validators.nullValidator && Validators.required]),
    email: new FormControl('', Validators.nullValidator && Validators.required),
    password: new FormControl('', Validators.nullValidator && Validators.required),
    confirmPassword: new FormControl('', Validators.nullValidator && Validators.required)
  });

  ngOnInit(): void {
  }
  
  onSubmit(): void {
    if (this.signupForm.valid && this.passwordsMatch()) {
      console.log('Form is valid');
      
      this.authService.signup(this.signupForm.value.username, this.signupForm.value.email, this.signupForm.value.password, this.signupForm.value.confirmPassword)
        .subscribe(
          (result) => {
            console.log('User signed up');
            this.showErrorMessage = false;
            this.goToLogin();
          },
          (error) => {
            console.log('Error signing up', {error});
            this.showErrorMessage = true;
            this.errorMessage = error.error.errorMessage ? error.error.errorMessage : error.error;
          }
        );
      
      
      // TODO: questo è da cancellare
      let user: User = {
        id: 1,
        username: 'someone',
        email: this.signupForm.value.email,
        monitoredCoins: [],
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
  
  private goToLogin() {
    this.router.navigate(['/login']);
  }
}
