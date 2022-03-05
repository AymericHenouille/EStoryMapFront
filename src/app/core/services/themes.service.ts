import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Theme } from '../models/themes.model';

@Injectable()
export class ThemesService {

  public readonly DEFAULT_THEME: Theme = Theme.DARK;
  private themeSubject$ = new BehaviorSubject(localStorage.getItem('theme') ?? this.DEFAULT_THEME);

  public get theme$(): Observable<string> {
    return this.themeSubject$.asObservable() as Observable<string>;
  }

  public updateTheme(theme: Theme | string): void {
    this.themeSubject$.next(theme);
  }

}
