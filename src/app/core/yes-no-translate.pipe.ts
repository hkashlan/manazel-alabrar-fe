import { inject, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { translationKeys } from './models/translations';

@Pipe({
  name: 'yesNoTranslate',
})
export class YesNoTranslatePipe implements PipeTransform {
  translate = inject(TranslateService);

  transform(value: boolean): string {
    return this.translate.instant(value ? translationKeys.yes : translationKeys.no);
  }
}
