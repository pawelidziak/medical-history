import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {WelcomeComponent} from './core-components/welcome/welcome.component';
import {MainComponent} from './core-components/main/main.component';
import {AuthGuard} from './_guard/auth.guard';
import {TimelineComponent} from './shared-components/timeline/timeline.component';

export const appRoutes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
    {path: ':key', component: TimelineComponent},
  ]},

  {path: '**', redirectTo: 'main'}
]as Routes;

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
