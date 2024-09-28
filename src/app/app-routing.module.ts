import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { HomeComponent } from './home/home.component';
import { CategorieComponent } from './categorie/categorie.component';
import { authenticationGuard } from './auth/authentication/authentication.guard';

const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [authenticationGuard],
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
