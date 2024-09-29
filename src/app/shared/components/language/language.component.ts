import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DEFAULT_LANGUAGE, LANGUAGES } from '../../constant.shared';
import { Language } from '../../model.shared';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent {
  languages: Language[] = LANGUAGES;
  selectedLanguage: string;
  constructor(private translateService: TranslateService) {
        this.selectedLanguage = translateService.getDefaultLang();
        this.languageInit();
  }
    changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const languageCode = target?.value;
    const selectedLang = this.languages.find(
      (lang) => lang.code === languageCode
    );
    if (selectedLang) {
      this.translateService.use(selectedLang.code);
      this.selectedLanguage = selectedLang.code;
    }
    this.loadTranslatedLanguages();
    }
    private languageInit() {
    const availableLangCodes = LANGUAGES.map((lang) => lang.code);

    this.translateService.addLangs(availableLangCodes);

    const browserLang = this.translateService.getBrowserLang();
    const langToUse: string =
      browserLang && availableLangCodes.includes(browserLang)
        ? browserLang
        : DEFAULT_LANGUAGE;
    this.translateService.use(langToUse);
    this.selectedLanguage = langToUse;
    this.loadTranslatedLanguages();
  }

  private loadTranslatedLanguages() {
    this.translateService
      .get(LANGUAGES.map((lang) => lang.name))
      .subscribe((translations) => {
        this.languages = LANGUAGES.map((lang) => ({
          code: lang.code,
          name: translations[lang.name],
        }));
      });
  }
}
