import { Routes } from '@angular/router';
import { loggedInGuard } from './guards/logged-in.guard';

export const routes: Routes = [
    { path: '', canActivate: [loggedInGuard], loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent) },
    { path: 'orders', canActivate: [loggedInGuard], loadChildren: () => import('./components/restaurant-user/orders/routes').then(mod => mod.ORDER_ROUTES) },
    { path: 'restaurant', canActivate: [loggedInGuard], loadChildren: () => import('./components/restaurant-user/restaurant/routes').then(mod => mod.RESTAURANT_ROUTES)},
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(mod => mod.LoginComponent)},
    { path: 'create-account', loadComponent: () => import('./components/create-account/create-account.component').then(mod => mod.CreateAccountComponent)},
    { path: 'menus', canActivate: [loggedInGuard], loadChildren: () => import('./components/restaurant/routes').then(mod => mod.MENU_ROUTES) },
    { path: '**', redirectTo: '' }
];
