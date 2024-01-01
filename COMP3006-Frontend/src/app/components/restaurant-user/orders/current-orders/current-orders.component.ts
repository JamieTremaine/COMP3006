import { Component, OnInit } from '@angular/core';
import { lastValueFrom, forkJoin } from 'rxjs';
import { Order } from '../../../../api/models';
import { RestaurantService } from '../../../../api/services';
import { NgOrderService } from '../../../../svc/order.service';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-current-orders',
    standalone: true,
    imports: [CurrencyPipe, RouterLink],
    templateUrl: './current-orders.component.html',
    styleUrl: './current-orders.component.scss'
})
export class CurrentOrdersComponent implements OnInit {
    orders: Array<Order> = []
    loading: boolean = true;

    constructor(private ngOrderService: NgOrderService, private restaurantService: RestaurantService) {}

    ngOnInit(): void {
        this.orders = this.ngOrderService.getAllOrders();

        let promises: Array<Promise<void>> = [];
        this.orders.forEach((order, idx) => {
            const promise = lastValueFrom(this.restaurantService.restaurantRestaurantIdGet({restaurantId: order.restaurant?._id})).then((result)=>{
                order.restaurant = result;
            })

            promises.push(promise);
        })

        forkJoin(promises).subscribe({complete: () => this.loading = false})
    }


    getTotal(items?: Array<MenuItem>): number {
        let total: number = 0;

        items?.forEach((item) => {
            total += item.price as number;
        })
        return total;
    }

    cancelOrder(restaurantId?: string) {
        if(restaurantId) {
            this.ngOrderService.cancelOrder(restaurantId);
            this.orders = this.ngOrderService.getAllOrders();
        }         
    }

}
