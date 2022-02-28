import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';

const ROUTES: Routes = [
  { path: '', component: LoginComponent, children: [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SigninComponent }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
