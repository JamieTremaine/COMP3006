import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrderService, } from '../../../api/services';
import { NgUserService } from '../../../svc/ng-user.service';
import { Subject, lastValueFrom, takeUntil } from 'rxjs';
import { Order } from '../../../api/models';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';
import { WebsocketService } from '../../../svc/websocket.service';
import { NgOrderService } from '../../../svc/order.service';

@Component({
    selector: 'app-restaurant-home',
    standalone: true,
    imports: [NgbAccordionModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class ResturantHomeComponent implements OnInit, OnDestroy {

    orders?: Array<Order> = [{}, {}, {}];

    private destroy$ = new Subject<void>();

    constructor(private orderService: OrderService, private ngUserService: NgUserService, private websocketService: WebsocketService, private ngOrderService: NgOrderService) {}


    ngOnInit(): void {
       this.getOrders();
       this.ngOrderService.newOrder.pipe(takeUntil(this.destroy$)).subscribe((order) => {
            this.orders?.push(order);
       }) 
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    nextStage(order: Order) {
        if(order.stage === 'recieved') {
            this.websocketService.sendMessage('preparing', order._id,);
            order.stage = 'preparing'; 
        } else if(order.stage === 'preparing'){
            this.websocketService.sendMessage('out for delivery', order._id);
            order.stage = 'out for delivery'; 
        } else if(order.stage === 'out for delivery') {
            this.websocketService.sendMessage('delivered', order._id);
            const idx = this.orders?.findIndex(o => o === order);

            if(idx && idx > -1) {
                this.orders?.splice(idx, 1);
            }
        } 
    }

    getOrders() {
        const resturantId = this.ngUserService.getUser()?.restaurantId;
        lastValueFrom(this.orderService.orderRestaurantIdActiveGet({restaurantId: resturantId})).then((result) =>{
            this.orders = result;
        })    
    }
}
