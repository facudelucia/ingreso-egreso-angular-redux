import { dashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthGuard } from '../services/auth.guard';


const rutasHijas: Routes = [
  { path: '', component: DashboardComponent, children: dashboardRoutes, canActivate: [AuthGuard] },
]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(rutasHijas)
  ],
  exports: [RouterModule]
})
export class DashboardRoutesModule { }
