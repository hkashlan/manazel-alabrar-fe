import { Component } from '@angular/core';
import { IconService } from './core/services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'manazel-alabrar-fe';

  constructor(iconService: IconService) {
    iconService.init();
  }
}
