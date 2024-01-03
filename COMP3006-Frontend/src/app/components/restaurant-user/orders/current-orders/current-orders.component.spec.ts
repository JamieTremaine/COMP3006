import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CurrentOrdersComponent } from './current-orders.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { RestaurantService } from '../../../../api/services';
import { Order, Restaurant } from '../../../../api/models';
import { of } from 'rxjs';
import { NgOrderService } from '../../../../svc/order.service';

describe('CurrentOrdersComponent', () => {
    let component: CurrentOrdersComponent;
    let fixture: ComponentFixture<CurrentOrdersComponent>;
    let restaurantService: RestaurantService;
    let ngOrderService: NgOrderService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CurrentOrdersComponent],
            providers: [provideHttpClient(), provideHttpClientTesting()]
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(CurrentOrdersComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        restaurantService = TestBed.inject(RestaurantService);
        ngOrderService = TestBed.inject(NgOrderService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get current orders', fakeAsync(() => {
        const restaurant: Restaurant = { _id: 'restaurant', name: 'restaurantName' };
        spyOn(restaurantService, 'restaurantRestaurantIdGet').and.returnValue(of(restaurant));

        const orders: Order[] = [{ _id: 'restaurant', items: [{name: 'itemname'}]  }];
        spyOn(ngOrderService, 'getAllOrders').and.returnValue(orders);

        component.ngOnInit();
        tick();
        
        expect(component.orders).toEqual(orders);
    }));

    it('should cancel order', ()=> {
        const orderServiceSpy = spyOn(ngOrderService, 'cancelOrder');
        component.cancelOrder('restaurantId');

        expect(orderServiceSpy).toHaveBeenCalledOnceWith('restaurantId');
    })
});
