import { Direction } from '@angular/cdk/bidi';
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IconService } from './core/services/icon.service';

import { register } from 'swiper/element/bundle';
import { CheckVersionService } from './core/services/check-version.service';
register();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'manazel-alabrar-fe';
  direction: Direction = 'ltr';

  constructor(iconService: IconService, translateService: TranslateService, checkVersionService: CheckVersionService) {
    iconService.init();
    translateService.onLangChange.subscribe((e) => {
      this.direction = e.lang === 'ar' ? 'rtl' : 'ltr';
    });
    checkVersionService.checkVersion();
  }
}
