import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DEFAULT_LANGUAGE, LANGUAGES } from '../../shared/constant.shared';
import { Language } from '../../shared/model.shared';
import { NotificationService } from '../../shared/notification/notification.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent implements OnInit{
  isSignIn = false;
  form: FormGroup = new FormGroup({});
  languages: Language[] = LANGUAGES;
  selectedLanguage: string;

  constructor(private notificationService: NotificationService, private translateService: TranslateService) { 
    this.selectedLanguage = translateService.getDefaultLang();
    this.languageInit();
  }
  
  ngOnInit(): void {
    this.setupForm();
  }

  changeLanguage(event: Event) {
    const target = event.target as HTMLSelectElement;
    const languageCode = target?.value;
    const selectedLang = this.languages.find(lang => lang.code === languageCode);
    if (selectedLang) {
      this.translateService.use(selectedLang.code);
      this.selectedLanguage = selectedLang.code;
    }
    this.loadTranslatedLanguages();
  }


  onSubmit(): void {
    if (this.form.valid) { 

    } else {
      if (this.isSignIn) {
        this.notificationService.error("AUTH.REGISTER_FAILED");
      } else {
        this.notificationService.error("AUTH.LOGIN_FAILED");
      }
    }
  }
  switchToForm() {
    this.isSignIn = !this.isSignIn;
    this.setupForm();
  }
  private languageInit() {
    const availableLangCodes = LANGUAGES.map(lang => lang.code);

    this.translateService.addLangs(availableLangCodes);

    const browserLang = this.translateService.getBrowserLang();
    const langToUse = browserLang && availableLangCodes.includes(browserLang) ? browserLang : DEFAULT_LANGUAGE;
    this.translateService.use(langToUse);
    this.selectedLanguage = langToUse;
    this.loadTranslatedLanguages();
  }
  private loadTranslatedLanguages() {
    this.translateService.get(LANGUAGES.map(lang => lang.name)).subscribe(translations => {
      this.languages = LANGUAGES.map(lang => ({
        code: lang.code,
        name: translations[lang.name]
      }));
    });
  }
  private setupForm():void {
    if (this.isSignIn) {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)]),
        name: new FormControl('', Validators.required)
      });
    } else {
      this.form = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required, Validators.minLength(6)])
      });
    }
  }
}
