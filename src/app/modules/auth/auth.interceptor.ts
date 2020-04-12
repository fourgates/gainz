import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { mergeMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AngularFireAuth, private router: Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.auth.idToken.pipe(
      mergeMap((token: any) => {
        if (token) {
          request = request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
        }
        return next.handle(request).pipe(tap(()=>{},
          (err: any)=>{
            if (err instanceof HttpErrorResponse) {
              if (err.status !== 401) {
              return;
              }
              this.router.navigate(['login']);
            }
          })
        );

    }));
  }
}
