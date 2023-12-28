import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ngOrderService {

    private currentOrders = new Map<string, Array<any>>();

    public activeOrders = new Subject<number>();

    constructor() { }

    addToOrder(resturantId: string, item: any) {
        if (this.currentOrders.has(resturantId)) {
            let order = this.currentOrders.get(resturantId) as Array<any>;
            order.push(item);
            this.currentOrders.set(resturantId, order);
        } else {
            this.currentOrders.set(resturantId, [item]);
            this.activeOrders.next(this.currentOrders.size);
        }
    }

    removeFromOrder(resturantId: string, item: any) {
        if (this.currentOrders.has(resturantId)) {
            let order = this.currentOrders.get(resturantId) as Array<any>;

            const idx = order.indexOf(item);
            order.slice(idx, 1);

            if (order.length === 0) {
                this.currentOrders.delete(resturantId);
                this.activeOrders.next(this.currentOrders.size);
            } else {
                this.currentOrders.set(resturantId, order);
            }
        }
    }

    getOrder(resturantId: string): Array<any> | undefined {
        return this.currentOrders.get(resturantId);
    }
}
