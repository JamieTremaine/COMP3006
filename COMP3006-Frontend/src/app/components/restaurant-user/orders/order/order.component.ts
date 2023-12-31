import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgOrderService } from '../../../../svc/order.service';
import { OrderService, RestaurantService } from '../../../../api/services';
import { Order, Restaurant, User } from '../../../../api/models';
import { Observable, lastValueFrom } from 'rxjs';
import { NgUserService } from '../../../../svc/ng-user.service';
import { CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Severity, ToastService } from '../../../../svc/toast.service';

@Component({
    selector: 'app-order',
    standalone: true,
    imports: [CurrencyPipe, FormsModule],
    templateUrl: './order.component.html',
    styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {
    activeOrder?: boolean;
    id: string;
    order?: Order;
    user?: User
    address?: Address;

    constructor(
        private activatedRoute: ActivatedRoute, 
        private ngOrderservice: NgOrderService, 
        private orderService: OrderService, 
        private restaurantService: RestaurantService,
        private ngUserService: NgUserService,
        private router: Router,
        private toaster: ToastService) {

        this.id = this.activatedRoute.snapshot.url[0]?.path;
    }


    ngOnInit(): void {
        const order =  this.getOrder(); 
        if (order) {
            this.activeOrder = true;
            lastValueFrom(this.getRestaurant(order.restaurant?._id as string)).then((result)=> {
                this.order = order;
                this.order.restaurant = result;
                console.log(this.order)
            });
        } else {
            lastValueFrom(this.loadOrder()).then((result) => {
                this.activeOrder = false;
                this.order = result;
            });
        }

        this.user = this.ngUserService.getUser();

        this.address = this.user?.addresses![0];
    }

    getOrder(): Order | undefined {
        return this.ngOrderservice.getOrder(this.id);
    }

    loadOrder(): Observable<Order> {
        return this.orderService.orderOrderIdGet({orderId: this.id})
    }

    getRestaurant(id: string): Observable<Restaurant> {
        return this.restaurantService.restaurantRestaurantIdGet({restaurantId: id})
    }


    sendOrder() {
        this.order!.address = this.address;
        lastValueFrom( this.ngOrderservice.sendOrder(this.order as Order)).then((result) => {
            //cancel really just removes from persistance. This is the behaviour I want
            this.ngOrderservice.cancelOrder(result.restaurant?._id as string);
            this.toaster.show('order sent', Severity.success, 5000);
            this.router.navigate(['']);
        });
    
    }

    getTotal(items?: Array<MenuItem>): number {
        let total: number = 0;

        items?.forEach((item) => {
            total += item.price as number;
        })
        return total;
    }





}
