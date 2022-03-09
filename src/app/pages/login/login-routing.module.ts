import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';

const ROUTES: Routes = [
  { path: '', component: LoginComponent, children: [
    { path: 'signin', component: SigninComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: 'signin', pathMatch: 'full' }
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
