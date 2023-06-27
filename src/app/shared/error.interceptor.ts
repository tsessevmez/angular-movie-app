import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((response: HttpErrorResponse) => {
        let message = 'Error!!';

        if (!navigator.onLine) {
          message = 'network problem';
          return throwError(message);
        }

        if (response.error.error) {
          if (response.status === 401) {
            message = 'Permission Denied!!';
            console.log(message);
            return throwError(message);
          }
        }

        if (response.error.error) {
          switch (response.error.error.message) {
            case 'Permission denied':
              message = 'Permission Denied';
              break;
            case 'EMAIL_EXISTS':
              message = 'Mail is exist';
              break;

            case 'EMAIL_NOT_FOUND':
              message = 'Email not exist';
              break;
            case 'INVALID_PASSWORD':
              message = 'Password invalid!';
              break;
          }
        }

        return throwError(message);
      })
    );
  }
}
