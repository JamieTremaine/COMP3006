import { Route } from "@angular/router";
import { PreviousOrdersComponent } from "./previous-orders/previous-orders.component";
import { OrderComponent } from "./order/order.component";
import { CurrentOrdersComponent } from "./current-orders/current-orders.component";

export const ORDER_ROUTES : Route[] = [
    { path: 'previous', children: [
        { path: '', component: PreviousOrdersComponent, pathMatch:'full' },
        { path: ':orderId', component: OrderComponent },
    ] },
    { path: 'current', children: [
        { path: '', component: CurrentOrdersComponent, pathMatch:'full' },
        { path: ':orderId', component: OrderComponent },
    ] },
    { path: '', redirectTo: 'previous', pathMatch: 'full'},
    { path: '**', redirectTo: 'previous' }
];