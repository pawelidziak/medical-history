import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from '../../../core/auth.guard';
import {UserProfileComponent} from './user-profile.component';


const userprofileRoutes: Routes = [
  {
    path: '', component: UserProfileComponent, canActivate: [AuthGuard]
  }
]as Routes;

export const userprofileRouting: ModuleWithProviders = RouterModule.forChild(userprofileRoutes);
