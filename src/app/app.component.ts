import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-container>
      <router-outlet></router-outlet>
    </app-container>`
})
export class AppComponent { }
