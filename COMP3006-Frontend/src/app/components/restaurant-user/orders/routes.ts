import { Route } from "@angular/router";
import { PreviousOrdersComponent } from "./previous-orders/previous-orders.component";
import { OrderComponent } from "./order/order.component";
import { CurrentOrdersComponent } from "./current-orders/current-orders.component";

export const ORDER_ROUTES : Route[] = [
    { path: 'previous', component: PreviousOrdersComponent },
    { path: 'active', component: CurrentOrdersComponent },
    { path: ':orderId', component: OrderComponent },
    { path: '', redirectTo: 'previous', pathMatch: 'full'},
    { path: '**', redirectTo: 'previous' }
];