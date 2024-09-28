import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { CategorieComponent } from './categorie/categorie.component';
import { authenticationGuard } from './auth/authentication/authentication.guard';
import { ExpenseComponent } from './expense/expense.component';

const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent },
  {
    path: 'expense/:id',
    component: ExpenseComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: 'categories',
    component: CategorieComponent,
    canActivate: [authenticationGuard],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
