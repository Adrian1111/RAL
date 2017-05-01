import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1 class="title">Reddit Articles</h1>
    <router-outlet></router-outlet>
    <router-outlet name="popup"></router-outlet>
  `
})
export class AppComponent {
}
