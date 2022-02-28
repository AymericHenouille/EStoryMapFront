import { NgModule } from '@angular/core';
import { ProfilRoutingModule } from './profil-routing.module';
import { ProfilComponent } from './pages/profil/profil.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ProfilComponent
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ProfilRoutingModule
  ]
})
export class ProfilModule { }
