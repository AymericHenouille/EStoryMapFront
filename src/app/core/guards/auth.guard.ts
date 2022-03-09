import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { first, map, Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService) { }

  public canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      first(),
      map(user => !!user)
    );
  }

}
