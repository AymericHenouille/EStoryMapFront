import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { ThemesService } from './services/themes.service';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpService } from './services/http.service';
import { WorkspaceService } from './services/workspaces.service';

@NgModule({
  declarations: [
    NavBarComponent
  ],
  imports: [
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    ThemesService,
    AuthService,
    HttpService,
    WorkspaceService
  ]
})
export class CoreModule { }
