import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { OrderComponent } from './order.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { OrderService, RestaurantService } from '../../../../api/services';
import { Order, Restaurant } from '../../../../api/models';
import { of } from 'rxjs';
import { NgOrderService } from '../../../../svc/order.service';

describe('OrderComponent', () => {
    let component: OrderComponent;
    let fixture: ComponentFixture<OrderComponent>;
    let restaurantService: RestaurantService;
    let orderService: OrderService;
    let ngOrderService: NgOrderService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [OrderComponent],
        providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(OrderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        restaurantService = TestBed.inject(RestaurantService);
        orderService = TestBed.inject(OrderService);
        ngOrderService = TestBed.inject(NgOrderService);
  });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get order from server', fakeAsync(() => {
        const order: Order = {_id: 'order', items: [{name: 'item'}] };
        spyOn(orderService, 'orderOrderIdGet').and.returnValue(of(order))

        component.ngOnInit();
        tick();
        expect(component.order).toEqual(order);
    }));

    it('should get order', fakeAsync(() => {
        const order: Order = {_id: 'order', items: [{name: 'item'}] };
        spyOn(component, 'getOrder').and.returnValue(order);

        const restaurant: Restaurant = { _id:'resturantId', name: 'restaurantName' };
        spyOn(restaurantService, 'restaurantRestaurantIdGet').and.returnValue(of(restaurant))

        component.ngOnInit();

        tick();
        expect(component.order).toEqual(order);
    }));

    it('should send order', () => {
        const order: Order = {_id: 'order', items: [{name: 'item'}], address: undefined };
        component.order = order

        const orderSpy = spyOn(ngOrderService, 'sendOrder').and.returnValue(of(order))

        component.sendOrder();

        expect(orderSpy).toHaveBeenCalledOnceWith(order);
    });
});
