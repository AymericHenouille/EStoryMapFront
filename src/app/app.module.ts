import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppContainerModule } from './features/app-container/app-container.module';
import { PagesModule } from './pages/pages.module';

@NgModule({
  declarations: [ AppComponent ],
  imports: [
    CoreModule,
    AppContainerModule,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
