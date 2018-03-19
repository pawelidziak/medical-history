import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const appRoutes: Routes = [
  {
    path: 'welcome',
    loadChildren: 'app/features/welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'dashboard',
    loadChildren: 'app/features/dashboard/dashboard.module#DashboardModule'
  },
  {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  {path: '**', redirectTo: 'dashboard/404'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
