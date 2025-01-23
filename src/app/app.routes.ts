import { HomeComponent } from '@/app/pages/home/home.component';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    component: HomeComponent,
    path: 'home',
    title: 'Home',
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  }
];
