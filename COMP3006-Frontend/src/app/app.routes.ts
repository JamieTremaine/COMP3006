import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent) },
    { path: 'menu', loadChildren: () => import('./components/menu/routes').then(mod => mod.MENU_ROUTES) },
    { path: 'orders', loadChildren: () => import('./components/orders/routes').then(mod => mod.ORDER_ROUTES) },
    { path: 'restaurant/:restaurantId', loadComponent: () => import('./components/restaurant/restaurant.component').then(mod => mod.RestaurantComponent)},
];
