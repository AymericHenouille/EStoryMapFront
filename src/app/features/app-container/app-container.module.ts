import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { AppContainerComponent } from './components/app-container/app-container.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    NavBarComponent,
    AppContainerComponent
  ],
  imports: [ SharedModule, FormsModule, RouterModule ],
  exports: [ AppContainerComponent ]
})
export class AppContainerModule { }
