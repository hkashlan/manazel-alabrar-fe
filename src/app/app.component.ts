import { Direction } from '@angular/cdk/bidi';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconService } from './core/services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'manazel-alabrar-fe';
  direction: Direction = 'ltr';

  constructor(iconService: IconService, translateService: TranslateService) {
    iconService.init();
    translateService.onLangChange.subscribe((e) => {
      this.direction = e.lang === 'ar' ? 'rtl' : 'ltr';
    });
  }
}
