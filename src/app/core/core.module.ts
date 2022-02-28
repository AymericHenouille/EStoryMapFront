import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { ThemesService } from './services/themes.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthService } from './services/auth.service';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    BrowserAnimationsModule
  ],
  providers: [
    AuthGuard,
    ThemesService,
    AuthService
  ]
})
export class CoreModule { }
