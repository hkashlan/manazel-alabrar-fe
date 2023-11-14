import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable()
export class DateInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return req.url.includes('api') ? this.fixDate(req, next) : next.handle(req);
  }

  private parseDates(obj: any): any {
    // If the input is an array, map its elements to recursively parse any date strings
    if (Array.isArray(obj)) {
      return obj.map((item) => this.parseDates(item));
    }

    // If the input is an object, recursively parse any date strings in its properties
    if (obj instanceof Object) {
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          const value = obj[key];

          if (typeof value === 'string' && key.toLowerCase().includes('date')) {
            const date = Date.parse(value);
            if (!isNaN(date) && value.length > 5) {
              obj[key] = new Date(date);
            }
          } else if (value instanceof Object) {
            obj[key] = this.parseDates(value);
          }
        }
      }
    }

    return obj;
  }

  fixDate(req: HttpRequest<any>, next: HttpHandler) {
    const modifiedReq = req.clone({
      // Set the response type to JSON
      responseType: 'json',
    });

    return next.handle(modifiedReq).pipe(
      map((event: HttpEvent<any>) => {
        // If the response is JSON, recursively parse any date strings to Date objects
        if (event instanceof HttpResponse && event.body) {
          const modifiedBody = this.parseDates(event.body);
          return event.clone({ body: modifiedBody });
        }

        return event;
      })
    );
  }
}
