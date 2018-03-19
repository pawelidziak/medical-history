import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

const appRoutes: Routes = [
  {
    path: 'welcome',
    loadChildren: 'app/features/welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'main',
    loadChildren: 'app/features/main/main.module#MainModule'
  },
  {path: '', redirectTo: 'main', pathMatch: 'full'},
  {path: '**', redirectTo: 'main/404'}
];

export const appRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
