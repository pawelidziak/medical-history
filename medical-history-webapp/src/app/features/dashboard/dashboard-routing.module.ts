import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {NotFoundComponent} from '../not-found/not-found.component';
import {EventListComponent} from '../event-list/event-list.component';
import {AuthGuard} from '../../core/auth.guard';
import {MainComponent} from './main/main.component';
import {UserProfileComponent} from './user-profile/user-profile.component';


const dashboardRoutes: Routes = [
  {
    path: '', component: DashboardComponent, canActivate: [AuthGuard], children: [
    {path: 'incident/:key', component: EventListComponent},
    {path: 'main', component: MainComponent},
    {path: 'profile', component: UserProfileComponent},
    {path: '404', component: NotFoundComponent},
    {path: '', redirectTo: 'main', pathMatch: 'full'},
  ]
  }
]as Routes;

export const dashboardRouting: ModuleWithProviders = RouterModule.forChild(dashboardRoutes);
