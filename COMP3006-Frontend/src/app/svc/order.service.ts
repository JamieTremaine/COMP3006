import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    private currentOrders = new Map<string, Array<any>>();

    constructor() { }

    addToOrder(resturantId: string, item: any) {
        if (this.currentOrders.has(resturantId)) {
            let order = this.currentOrders.get(resturantId) as Array<any>;
            order.push(item);
            this.currentOrders.set(resturantId, order);
        } else {
            this.currentOrders.set(resturantId, [item]);
        }
    }

    removeFromOrder(resturantId: string, item: any) {
        if (this.currentOrders.has(resturantId)) {
            let order = this.currentOrders.get(resturantId) as Array<any>;

            const idx = order.indexOf(item);
            order.slice(idx, 1);

            if (order.length === 0) {
                this.currentOrders.delete(resturantId);
            } else {
                this.currentOrders.set(resturantId, order);
            }
        }
    }

    getOrder(resturantId: string): Array<any> | undefined {
        return this.currentOrders.get(resturantId);
    }
}
