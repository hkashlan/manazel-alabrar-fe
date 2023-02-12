import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translationKeys } from './core/models/translations';
import { IconService } from './core/services/icon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'manazel-alabrar-fe';

  constructor(iconService: IconService, translateService: TranslateService) {
    translateService.addLangs(['ar', 'en']);
    iconService.init();
    translateService
      .get(translationKeys.alsalam_3alaikom)
      .subscribe((tt) => console.log(tt));
  }
}
