import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Subscription } from 'rxjs';
import { Theme } from 'src/app/core/models/themes.model';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { ThemesService } from 'src/app/core/services/themes.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {

  public isDark: boolean = false;
  public user: User | undefined;
  private _theme!: Subscription;
  private _user!: Subscription;

  constructor(
    private themeService: ThemesService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this._theme = this.themeService.theme$.subscribe(theme => {
      this.renderer.setAttribute(this.document.body, 'class', `mat-typography mat-app-background ${theme}`);
      localStorage.setItem('theme', theme);
      this.isDark = theme === Theme.DARK;
    });
    this._user = this.authService.user$.subscribe(user => this.user = user);
  }

  public ngOnDestroy(): void {
    this._theme.unsubscribe();
    this._user.unsubscribe();
  }

  public logout(): void {
    this.authService.logout();
  }

  public toggleTheme(event: MatSlideToggleChange): void {
    const theme: Theme = event.checked ? Theme.DARK : Theme.LIGHT;
    this.themeService.updateTheme(theme);
  }

  public get icon(): string {
    return this.isDark ? 'light_mode' : 'dark_mode';
  }

}
