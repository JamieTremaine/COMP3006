import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent) },
    { path: 'menu', loadChildren: () => import('./components/menu/routes').then(mod => mod.MENU_ROUTES) },
    { path: 'order', loadComponent: () => import('./components/order/order.component').then(mod => mod.OrderComponent) },
];
