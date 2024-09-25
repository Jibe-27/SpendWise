import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticationComponent } from './auth/authentication/authentication.component';
import { CategorieComponent } from './categorie/categorie.component';
import { authenticationGuard } from './auth/authentication/authentication.guard';

const routes: Routes = [
  { path: 'auth', component: AuthenticationComponent },
  { path: '', component: CategorieComponent, canActivate:[authenticationGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
}
