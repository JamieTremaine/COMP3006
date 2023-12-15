import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class OrderService {

    private currentOrder: Array<any> = [];

    constructor() { }


    addToOrder(item: any) {
        this.currentOrder.push(item);
    }

    removeFromOrder(item: any) {
        const idx = this.currentOrder.indexOf(item);
        this.currentOrder.slice(idx, 1);
    }


    getOrder(): Array<any> {
        return this.currentOrder;
    }
}
