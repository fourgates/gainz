import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-login',
  template: `
  <div class="container pt-3">
    <div class="row justify-content-sm-center">
      <div class="col-sm-10 col-md-6">
        <div class="card border-info">
          <div class="card-header">Login</div>
          <div class="card-body">
            <div class="row">
              <div class="col-md-4 text-center">
                <img src="https://placeimg.com/128/128/nature">
              </div>
              <div class="col-md-8">
                <div>
                  <input type="text" class="form-control mb-2" placeholder="Email" required autofocus>
                  <input type="password" class="form-control mb-2" placeholder="Password" required>
                  <button class="btn btn-lg btn-primary btn-block mb-1" 
                  (click)="login()">Login
                  </button>
                  <button class="btn btn-lg btn-primary btn-block mb-1" 
                  (click)="loginWithGoogle()">Login with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  styles: [`
  .card {
    box-shadow: 0  10px  20px  rgba(0,0,0,0.19), 0  6px  6px  rgba(0,0,0,0.23);
  }
  `]
})
export class LoginComponent implements OnInit {

  constructor(private  authService:  AuthService) { }

  ngOnInit(): void {
    //this.authService.login('ninan.phillip@gmail.com', 'powder1122');
    
  }

  login(){
    this.authService.login('email', 'password');
  }
  loginWithGoogle(){
    this.authService.loginWithGoogle();
  }
}
