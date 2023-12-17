import { Route } from "@angular/router";
import { OrdersComponent } from "./orders/orders.component";
import { OrderComponent } from "./order/order.component";

export const ORDER_ROUTES : Route[] = [
    { path: '', component: OrdersComponent },
    { path: ':orderId', component: OrderComponent },
];