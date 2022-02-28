import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginModule) },
  { path: 'profil', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule), canActivate: [AuthGuard] },
  { path: 'project', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule), canActivate: [AuthGuard] },
  { path: 'workspaces', loadChildren: () => import('./workspace/workspace.module').then(m => m.WorkspaceModule), canActivate: [AuthGuard] },
  { path: '', redirectTo: 'workspaces', pathMatch: 'full' }
];

@NgModule({
  declarations: [],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class PagesModule { }
