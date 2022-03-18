import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilComponent } from './pages/profil/profil.component';

const ROUTES: Routes = [
  { path: '', component: ProfilComponent }
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class ProfilRoutingModule { }
