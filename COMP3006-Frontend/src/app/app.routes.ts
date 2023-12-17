import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent) },
    { path: 'orders', loadChildren: () => import('./components/orders/routes').then(mod => mod.ORDER_ROUTES) },
    { path: 'restaurant', loadChildren: () => import('./components/restaurant/routes').then(mod => mod.RESTAURANT_ROUTES)},
];
