import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {WelcomeComponent} from './welcome.component';


const welcomeRoutes: Routes = [
  {path: '', component: WelcomeComponent}

]as Routes;

export const welcomeRouting: ModuleWithProviders = RouterModule.forChild(welcomeRoutes);
