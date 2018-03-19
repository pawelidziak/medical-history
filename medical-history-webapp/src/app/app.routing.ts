import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

// const appRoutes: Routes = [
//   {
//     path: 'welcome',
//     loadChildren: 'app/features/welcome/welcome.module#WelcomeModule'
//   },
//   // {
//   //   path: 'main',
//   //   loadChildren: 'app/features/main/main.module#MainModule'
//   // },
//   // {path: '**', redirectTo: 'main'}
//   // { path: '', redirectTo: 'welcome', pathMatch: 'full' }
//
// ]as Routes;
//
// export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

const appRoutes: Routes = [
  {
    path: 'welcome',
    loadChildren: 'app/features/welcome/welcome.module#WelcomeModule'
  },
  {
    path: 'main',
    loadChildren: 'app/features/main/main.module#MainModule'
  },
];

export const AppRouting: ModuleWithProviders = RouterModule.forRoot(appRoutes);
