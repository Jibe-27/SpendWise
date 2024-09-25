import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE } from './shared/constant.shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'SpendWise';
  constructor(private translate: TranslateService) {
    this.translate.setDefaultLang(DEFAULT_LANGUAGE);
  }

  switchLanguage(lang: string) {
    this.translate.use(lang);
  }
}
