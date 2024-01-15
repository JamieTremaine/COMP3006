import { Route } from "@angular/router";
import { CurrentOrdersComponent } from "../restaurant-user/orders/current-orders/current-orders.component";
import { OrderComponent } from "../restaurant-user/orders/order/order.component";
import { MenusComponent } from "./menus/menus.component";
import { MenuEditorComponent } from "./menu-editor/menu-editor.component";

export const MENU_ROUTES : Route[] = [
    { path: ':restaurantId', children: [
        { path: '', component: MenusComponent, pathMatch:'full' },
        { path: ':menuId/edit', pathMatch:'full', component: MenuEditorComponent },
        { path: 'new', pathMatch:'full', component: MenuEditorComponent },
    ] },
    { path: 'current', children: [
        { path: '', component: CurrentOrdersComponent, pathMatch:'full' },
        { path: ':orderId', component: OrderComponent },
    ] },
    { path: '**', redirectTo: '' }
];