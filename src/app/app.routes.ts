
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    loadComponent: () => import('@/app/pages/home/home.component').then(m => m.HomeComponent),
    path: 'home',
    title: 'Home',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
