import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Order } from '../api/models';
import { PersistanceService } from './persistance.service';
import { NgUserService } from './ng-user.service';
import { OrderService } from '../api/services';

@Injectable({
    providedIn: 'root'
})

export class NgOrderService implements OnDestroy {

    public activeOrders = new Subject<number>();
    private currentOrders = new Map<string, Order>();

    private destroy$ = new Subject<void>();

    constructor(private persistanceService: PersistanceService, private ngUserService: NgUserService, private orderService: OrderService) { 
        this.ngUserService.LoggedInSubject.pipe(takeUntil(this.destroy$)).subscribe((value) => {
            if(value) {
                const orders = this.persistanceService.getOrders(ngUserService.getUser()?._id as string)

                orders?.forEach((order => {
                    this.currentOrders.set(order.restaurant?._id as string, order);
                }))

                this.activeOrders.next(this.currentOrders.size);
            }
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    addToOrder(resturantId: string, item: MenuItem) {
        if (this.currentOrders.has(resturantId)) {
            let order = this.currentOrders.get(resturantId) as Order;
            order?.items?.push(item);
            this.currentOrders.set(resturantId, order);
        } else {
            const order: Order = { restaurant: {_id: resturantId }, items: [item], userId: this.ngUserService.getUser()?._id};
            this.currentOrders.set(resturantId, order);
            this.activeOrders.next(this.currentOrders.size);
        }

        this.persistanceService.setOrder(this.getOrder(resturantId) as Order);
    }

    removeFromOrder(resturantId: string, item: MenuItem) {
        if (this.currentOrders.has(resturantId)) {
            let order = this.currentOrders.get(resturantId) as Order;

            const idx = order.items?.indexOf(item);
            order.items = order.items?.slice(idx, 1);

            if (order.items?.length === 0) {
                this.currentOrders.delete(resturantId);
                this.activeOrders.next(this.currentOrders.size);
            } else {
                this.currentOrders.set(resturantId, order);
            }
        }
    }

    getAllOrders(): Array<Order> {
        return Array.from(this.currentOrders.values())
    }

    getOrder(resturantId: string): Order | undefined {
        return this.currentOrders.get(resturantId);
    }

    getNumOrder(): number {
        return this.currentOrders.size;
    }

    cancelOrder(restaurantId: string) {
        const order = this.getOrder(restaurantId);
        this.currentOrders.delete(restaurantId);

        if(order && order.userId && order.restaurant?._id) {
            this.persistanceService.removeOrder(order.userId, order.restaurant._id);
        }
        this.activeOrders.next(this.currentOrders.size);
    }

    sendOrder(order: Order): Observable<Order> {
        return this.orderService.orderPost({body: order});
    }
}
