import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./home/home.component').then(mod => mod.HomeComponent) },
    { path: 'menu', loadChildren: () => import('./menu/routes').then(mod => mod.MENU_ROUTES) },
    { path: 'order', loadComponent: () => import('./order/order.component').then(mod => mod.OrderComponent) },
];
