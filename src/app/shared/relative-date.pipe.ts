import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'relativeDate'
})
export class RelativeDatePipe implements PipeTransform {

  constructor(private translate: TranslateService) {}

  transform(value: Date): string {
    const today = new Date();
    const givenDate = new Date(value);

    const daysDifference = Math.floor((today.getTime() - givenDate.getTime()) / (1000 * 3600 * 24));

    if (daysDifference < 1) {
      return this.translate.instant('COMMON.TODAY');
    } else if (daysDifference < 2) {
      return this.translate.instant('COMMON.YESTERDAY');
    } else if (daysDifference < 30) {
      return this.translate.instant('COMMON.DAYS_AGO', { count: daysDifference });
    }

    return this.formatFullDate(givenDate);
  }

  private formatFullDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(this.translate.currentLang, options);
  }
}
