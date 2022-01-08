import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WishComponent } from './wish/wish.component';
import { AuthGuard } from './auth.guard';
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]

  },
  {
    path: 'index',
    component:  IndexComponent


  },
  {
    path: 'wish/:id',
    component:  WishComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'index',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],


exports: [RouterModule]
})
export class AppRoutingModule { }
