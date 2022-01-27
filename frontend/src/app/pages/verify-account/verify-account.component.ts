import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {SubjectService} from "../../core/services/subject.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styles: [
  ]
})
export class VerifyAccountComponent implements OnInit {
  showErrorMessage: boolean = false;
  errorMessage: string;
  
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }
  
  accountValidationForm = new FormGroup({
    email: new FormControl('', Validators.nullValidator && Validators.required),
    verificationCode: new FormControl('', Validators.nullValidator && Validators.required)
  });
  
  ngOnInit(): void {
  }
  
  onSubmit() {
    if (this.accountValidationForm.valid) {
      this.authService.verifyAccount(this.accountValidationForm.value.email, this.accountValidationForm.value.verificationCode).subscribe(
        (res) => {
          this.showErrorMessage = false;
          this.accountValidationForm.reset();
          this.goToLogin();
        },
        error => {
          console.log(error);
          this.showErrorMessage = true;
          this.errorMessage = error.error.errorMessage ? error.error.errorMessage : error.error;
        }
      );
    }
  }
  
  private goToLogin() {
    this.router.navigate(['/login']);
  }
}
