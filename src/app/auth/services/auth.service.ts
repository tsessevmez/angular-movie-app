import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response.model';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  api_key = environment.api_key;
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router: Router) {}

  signUp(email: string, password: string) {
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
      this.api_key;
    return this.http
      .post<AuthResponse>(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    const url =
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
      this.api_key;
    return this.http
      .post<AuthResponse>(url, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((response) => {
          this.handleAuthentication(
            response.email,
            response.localId,
            response.idToken,
            +response.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user) {
      return;
    }

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpirationDate)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
    this.router.navigate(['/auth']);
  }

  handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate);

    this.user.next(user);

    localStorage.setItem('user', JSON.stringify(user));
  }

  // private handleError(response: HttpErrorResponse) {
  //   let message = 'Error';
  //   console.log(response.error.error.message, 'errorr');

  //   if (!navigator.onLine) {
  //     message = 'network problem';
  //     return throwError(message);
  //   }

  //   if (response.error.error) {
  //     switch (response.error.error.message) {
  //       case 'Permission denied':
  //         message = 'Permission Denied';
  //         break;
  //       case 'EMAIL_EXISTS':
  //         message = 'Mail is exist';
  //         break;

  //       case 'EMAIL_NOT_FOUND':
  //         message = 'Email not exist';
  //         break;
  //       case 'INVALID_PASSWORD':
  //         message = 'Password invalid!';
  //         break;
  //     }
  //   }

  //   return throwError(message);
  // }
}
