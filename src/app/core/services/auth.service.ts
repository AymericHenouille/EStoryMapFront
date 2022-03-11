import { Injectable } from '@angular/core';
import { BehaviorSubject, lastValueFrom, merge, Observable, of, Subject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '../models/user.model';
import { HttpService } from './http.service';

@Injectable()
export class AuthService {

  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userCheck$: Subject<void> = new Subject();

  constructor(private httpService: HttpService) { }

  public loginWithEmailAndPassword(email: string, password: string): Promise<string> {
    const token: string = `Basic ${btoa(`${email}:${password}`)}`;
    return this.updateAuthState(lastValueFrom<string>(this.httpService.get('login', { Authorization: token })));
  }

  public register(user: User, password: string): Promise<User> {
    return this.updateAuthState(lastValueFrom<User>(this.httpService.post('registration', {
      name: user.name,
      email: user.email,
      password
    })));
  }

  public get user$(): Observable<User | undefined> {
    return merge(of({}), this.userCheck$.asObservable()).pipe(
      switchMap(() => this.httpService.get<User>('user'))
    );
  }

  public get loading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public updateUserState(user: User): Promise<void> {
    return Promise.resolve();
  }

  private updateAuthState<T>(promise: Promise<T>): Promise<T> {
    this.isLoading$.next(true);
    return promise.finally(() => {
      this.isLoading$.next(false);
      this.userCheck$.next();
    });
  }

}
