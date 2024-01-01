import { Component, OnInit } from '@angular/core';
import { OrderService, } from '../../../api/services';
import { NgUserService } from '../../../svc/ng-user.service';
import { lastValueFrom } from 'rxjs';
import { Order } from '../../../api/models';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-restaurant-home',
    standalone: true,
    imports: [NgbAccordionModule],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class ResturantHomeComponent implements OnInit {

    orders?: Array<Order> = [{}, {}, {}];

    constructor(private orderService: OrderService, private ngUserService: NgUserService) {}


    ngOnInit(): void {
        const resturantId = this.ngUserService.getUser()?.restaurantId;
        lastValueFrom(this.orderService.orderRestaurantIdActiveGet({restaurantId: resturantId})).then((result) =>{
            this.orders = result;
            console.log(this.orders);
        })    
    }
}
