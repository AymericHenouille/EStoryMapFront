import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, first, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from '../services/auth.service';

@Injectable()
export class UserLoginInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.loginToken$.pipe(
      first(),
      map(token => req.clone({
        headers: req.url === 'registration' ? req.headers : req.headers
          .set('authorization', token),
        url: `${environment.serverLocation}/api/${req.url}`
      })),
      switchMap((req) => next.handle(req))
    );
  }



}
