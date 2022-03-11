import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { first, map, Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  public canActivate(): Observable<boolean> {
    return this.authService.user$.pipe(
      first(),
      map(user => !!user),
      tap(isLog => isLog || this.router.navigate(['/login']))
    );
  }

}
