import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent, LoginComponent } from './modules';
import { AuthGuard } from './shared';

const routes: Routes = [
  { path: '', canActivate: [AuthGuard], component: HomeComponent, },
  { path: 'home', canActivate: [AuthGuard], component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'company',
    //canActivate: [AuthGuard],
    loadChildren: () => import('./modules/')
      .then(mod => mod.CompanyModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
