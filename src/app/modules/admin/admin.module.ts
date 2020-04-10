import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './verify-email/verify-email.component';



@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotPasswordComponent, VerifyEmailComponent],
  imports: [
    CommonModule
  ],
  exports: [LoginComponent]
})
export class AdminModule { }
