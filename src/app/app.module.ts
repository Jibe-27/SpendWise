import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AuthenticationComponent } from './authentication/authentication.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationComponent } from './shared/notification/notification.component';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { HomeComponent } from './home/home.component';
import { ChartModule } from 'primeng/chart';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ModalFormComponent } from './modal-form/modal-form.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ExpenseComponent } from './expense/expense.component';
import { RelativeDatePipe } from './shared/relative-date.pipe';
import { HighlightImportantExpenseDirective } from './shared/highlight-important-expense.directive';
import { HeaderComponent } from './header/header.component';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { LanguageComponent } from './shared/components/language/language.component';
import { ExpenseCardComponent } from './expense-card/expense-card.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    NotificationComponent,
    HomeComponent,
    NotificationComponent,
    ModalFormComponent,
    AddCategorieComponent,
    ExpenseComponent,
    RelativeDatePipe,
    HighlightImportantExpenseDirective,
    HeaderComponent,
    AuthenticatedLayoutComponent,
    LanguageComponent,
    ExpenseCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ToastModule,
    ButtonModule,
    DialogModule,
    TableModule,
    ChartModule,
    ProgressBarModule,
    DropdownModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [MessageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
