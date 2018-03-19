import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';
import {WelcomeComponent} from './features/welcome/welcome.component';
import {MainComponent} from './features/main/main.component';
import {AuthGuard} from './core/auth.guard';
import {EventListComponent} from './features/event-list/event-list.component';
import {NotFoundComponent} from './features/not-found/not-found.component';

export const appRoutes: Routes = [
  {path: 'welcome', component: WelcomeComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard], children: [
    {path: '404', component: NotFoundComponent},
    {path: ':key', component: EventListComponent}
  ]},

  {path: '**', redirectTo: 'main'},

]as Routes;

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
