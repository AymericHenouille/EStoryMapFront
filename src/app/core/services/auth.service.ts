import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {

  constructor(private httpService: HttpService) { }

  public loginWithEmailAndPassword(email: string, password: string): Promise<void> {
    return Promise.resolve();
  }

  public register(user: User, password: string): Promise<void> {
    return Promise.resolve();
  }

  public get user$(): Observable<User> {
    return of({
      name: 'Wicket',
      email: 'wicket.theewok@endor.emp'
    });
  }

  public updateUserState(user: User): Promise<void> {
    return Promise.resolve();
  }

}
