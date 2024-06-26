import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canActiveGuard } from './auth/guards/auth.guard';

const routes: Routes = [
  {
    path:'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)//para carga peresoza
  },
  {
    path:'dashboard',
    loadChildren: ()=> import('./dashboard/dashobard.module').then(m => m.DashboardModule),
    canActivate: [canActiveGuard]
  },
  {
    path:'transaction',
    canActivate: [canActiveGuard],
    loadChildren: ()=> import('./transactions/transactions.module').then(m => m.TransactionsModule)
  },
  {
    path:'reports',
    canActivate: [canActiveGuard],
    loadChildren: ()=> import('./reports/reports.module').then(m => m.ReportModule)
  },
  {
    path:'**',
    redirectTo:'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
