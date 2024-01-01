import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../../api/services';
import { lastValueFrom } from 'rxjs';
import { NgUserService } from '../../../../svc/ng-user.service';
import { Order } from '../../../../api/models';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-previous-orders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './previous-orders.component.html',
  styleUrl: './previous-orders.component.scss'
})
export class PreviousOrdersComponent implements OnInit {

    orders?: Array<Order>;
    
    constructor(private orderService: OrderService, private userService: NgUserService) {}

    ngOnInit(): void {
        const userId = this.userService.getUser()?._id
       lastValueFrom(this.orderService.orderUserIdRecentGet({userId: userId})).then((result) => {
        this.orders = result;
       })
    }

}
