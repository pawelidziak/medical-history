import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {WelcomeComponent} from './core-components/welcome/welcome.component';
import {HomeComponent} from './core-components/home/home.component';

const appRoutes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'home', component: HomeComponent},
  {path: '**', redirectTo: 'home'}
]as Routes;

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
