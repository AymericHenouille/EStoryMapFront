import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guards/auth.guard';
import { ThemesService } from './services/themes.service';
import { AuthService } from './services/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WorkspaceService } from './services/workspaces.service';
import { ProjectService } from './services/project.service';
import { UserLoginInterceptor } from './interceptor/userlogin.interceptor';
import { UploadFileService } from './services/upload-file.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    AuthGuard,
    ThemesService,
    AuthService,
    WorkspaceService,
    ProjectService,
    UploadFileService,
    { provide: HTTP_INTERCEPTORS, useClass: UserLoginInterceptor, multi: true },
  ]
})
export class CoreModule { }
