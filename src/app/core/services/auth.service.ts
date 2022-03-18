import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

export type UserState = {
  username: string;
  password: string;
};

@Injectable()
export class AuthService {

  private isLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userSubject$: BehaviorSubject<User | undefined> = new BehaviorSubject<User | undefined>(undefined);
  private state$: BehaviorSubject<UserState | undefined> = new BehaviorSubject<UserState | undefined>(undefined);

  constructor(private httpClient: HttpClient, private router: Router) { }

  public loginWithEmailAndPassword(username: string, password: string): Promise<User> {
    const login: Promise<User> = lastValueFrom(this.httpClient.get<User>('user'));
    return this.updateAuthState({ username, password }, login)
      .then((user) => {
        this.userSubject$.next(user);
        return user;
      });
  }

  public register(user: User, password: string): Promise<User> {
    const register: Promise<User> = lastValueFrom(this.httpClient.post<User>('registration', {
      name: user.name,
      email: user.email,
      password
    }));
    return this.updateAuthState({ username: user.email, password }, register);
  }

  public logout(): Promise<boolean> {
    this.state$.next(undefined);
    this.userSubject$.next(undefined);
    return this.router.navigate(['/login']);
  }

  public updateUser(user: User): Promise<User> {
    const user$: Observable<User> = this.httpClient.put<User>('user', user).pipe(
      tap((updatedUser: User) => this.userSubject$.next(updatedUser)),
    );
    return lastValueFrom(user$);
  }

  public get loginToken$(): Observable<string> {
    return this.state$.pipe(
      filter(state => !!state),
      map(state => `Basic ${btoa(`${state?.username}:${state?.password}`)}`),
    );
  }

  public get user$(): Observable<User | undefined> {
    return this.userSubject$.asObservable();
  }

  public get loading$(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  private updateAuthState<T>(state: UserState, promise: Promise<T>): Promise<T> {
    this.state$.next(state);
    this.isLoading$.next(true);
    return promise.finally(() => this.isLoading$.next(false));
  }

}
