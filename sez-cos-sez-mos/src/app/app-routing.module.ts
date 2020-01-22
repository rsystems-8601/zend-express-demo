import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ThemeComponent } from './theme/theme.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {
    path:"login", loadChildren:() => import("../app/login/login.module").then(m => m.LoginModule)
  },
  {
    path:"theme", component: ThemeComponent
  },
  {
    path:"console", 
    loadChildren:() => import("./portal-dashboard/portal-dashboard.module").then(m => m.PortalDashboardModule),
    canActivateChild:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: "login"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,  { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const appRoutingProviders: any[] = [
  AuthGuard
];
