import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule
  ],
  providers: [
    AuthGuard
  ]
})
export class CoreModule { }
