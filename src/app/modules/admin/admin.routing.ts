import { LoginComponent } from  './login/login.component';
import { RegisterComponent } from  './register/register.component';
import { ForgotPasswordComponent } from  './forgot-password/forgot-password.component';
import { VerifyEmailComponent } from  './verify-email/verify-email.component';
import { HomeComponent } from '../home/container/home.component';
import { Routes } from '@angular/router';

const  routes:  Routes  = 
[
    {
    path:  'admin',
    component:  HomeComponent,

    children: [
        { path:  'login',component:  LoginComponent},
        { path:  'register', component:  RegisterComponent },
        { path:  'forgot-password', component:  ForgotPasswordComponent },
        { path:  'verify-email', component:  VerifyEmailComponent }
        ]
    }
];