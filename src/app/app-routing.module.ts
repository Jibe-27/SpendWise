import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExpenseComponent } from './expense/expense.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { authenticationGuard } from './authentication/authentication.guard';
import { AuthenticatedLayoutComponent } from './authenticated-layout/authenticated-layout.component';
import { AddCategorieComponent } from './add-categorie/add-categorie.component';
import { ModalFormComponent } from './modal-form/modal-form.component';


const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent },
  {
    path: 'home',
    component: AuthenticatedLayoutComponent,
    canActivate: [authenticationGuard],
    children: [
      { path: '', component: HomeComponent },
      { path: 'categories', component: AddCategorieComponent },
      { path: 'expense/:id', component: ExpenseComponent }
      
    ]
  },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
