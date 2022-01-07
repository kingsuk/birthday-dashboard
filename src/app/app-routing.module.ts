import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
    // loadChildren: () => import('./dashboard/dashboard.component').then( m => m.DashboardComponent)
  },
  {
    path: 'index',
    component:  IndexComponent
    // loadChildren: () => import('./admin-login/admin-login.component').then( m => m.AdminLoginComponent)
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
