import { Component, OnInit } from '@angular/core';
import { NgOrderService } from '../../../../svc/order.service';
import { Order } from '../../../../api/models';
import { RestaurantService } from '../../../../api/services';
import { forkJoin, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [],
  templateUrl: './order.component.html',
  styleUrl: './order.component.scss'
})
export class OrderComponent implements OnInit {

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


}
