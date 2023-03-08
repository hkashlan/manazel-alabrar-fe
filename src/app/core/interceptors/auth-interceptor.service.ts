import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Get the authorization token from your authentication service
    const authToken = this.authService.getPersistedToken();

    // Clone the request and add the authorization header
    const authReq = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${authToken}`),
    });

    // Pass the cloned request to the next handler
    return next.handle(authReq);
  }
}
