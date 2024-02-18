import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn) => {
  const authService = inject(AuthenticationService);
  // Get the authorization token from your authentication service
  const authToken = authService.getPersistedToken();

  // Clone the request and add the authorization header
  const authReq = req.url.includes('api')
    ? req.clone({
        headers: req.headers.set('Authorization', `Bearer ${authToken}`),
      })
    : req;

  // Pass the cloned request to the next handler
  return next(authReq).pipe(
    catchError((err) => {
      if ([401, 403].includes(err.status)) {
        // auto logout if 401 or 403 response returned from api
        authService.logout();
      }

      const error = err.error?.message || err.statusText;
      console.error(err);
      return throwError(() => error);
    })
  );
};
