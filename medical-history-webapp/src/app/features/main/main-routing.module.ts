import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from './main.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {EventListComponent} from '../event-list/event-list.component';
import {AuthGuard} from '../../core/auth.guard';


const mainRoutes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthGuard], children: [
      {path: '404', component: NotFoundComponent},
      {path: ':key', component: EventListComponent}
    ]
  }
]as Routes;

export const mainRouting: ModuleWithProviders = RouterModule.forChild(mainRoutes);
