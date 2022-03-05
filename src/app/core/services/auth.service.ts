import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../models/user.model';

@Injectable()
export class AuthService {

  public get user$(): Observable<User> {
    return of({
      name: 'Wicket',
      email: 'wicket.theewok@endor.emp'
    })
  }

  public updateUserState(user: User): Promise<void> {
    return Promise.resolve();
  }

}
