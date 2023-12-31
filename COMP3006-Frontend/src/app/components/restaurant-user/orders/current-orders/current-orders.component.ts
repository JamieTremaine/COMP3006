import { Component, OnInit } from '@angular/core';
import { lastValueFrom, forkJoin } from 'rxjs';
import { Order } from '../../../../api/models';
import { RestaurantService } from '../../../../api/services';
import { NgOrderService } from '../../../../svc/order.service';

@Component({
  selector: 'app-current-orders',
  standalone: true,
  imports: [],
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

}
