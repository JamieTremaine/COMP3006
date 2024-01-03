import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { NgOrderService } from './order.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { NgUserService } from './ng-user.service';
import { PersistanceService } from './persistance.service';
import { Order } from '../api/models';
import { OrderService } from '../api/services';

describe('NgOrderService', () => {
     let service: NgOrderService;
     let ngUserService: NgUserService;
     let persistanceService: PersistanceService;
     let orderService: OrderService;


    beforeEach(() => {
        TestBed.configureTestingModule({
        providers: [provideHttpClient(), provideHttpClientTesting()]
        });
        service = TestBed.inject(NgOrderService);
        ngUserService = TestBed.inject(NgUserService);
        persistanceService = TestBed.inject(PersistanceService);
        orderService = TestBed.inject(OrderService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get orders after logging in', fakeAsync(()=> {

        const order: Order[] = [{restaurant: {_id:'one'}, items: [{ name:'itemname'}]}, { restaurant: {_id:'two'}, items: [{ name:'itemnametwo'}]}]
        
        spyOn(persistanceService, 'getOrders').and.returnValue(order)
        ngUserService.LoggedInSubject.next(true);

        const expectedValue = new Map<string, Order>();
        expectedValue.set('one', order[0]);
        expectedValue.set('two', order[1]);

        expect(service['currentOrders']).toEqual(expectedValue)
    }));

    it('should add to order', fakeAsync(() => {

        spyOn(ngUserService, 'getUser').and.returnValue({_id: 'userId'})

        const menuItem: MenuItem = {name: 'itemOne', description: 'item decription'}
        service.addToOrder('restaurantOne', menuItem)

        const order: Order =  {restaurant: {_id:'restaurantOne'}, items: [{ name:'itemOne', description: 'item decription'}], userId: 'userId'};

        const expectedValue = new Map<string, Order>();
        expectedValue.set('restaurantOne', order);

        expect(service['currentOrders']).toEqual(expectedValue);
    }));

    it('should cancel order', () => {

        spyOn(persistanceService, 'removeOrder');

        const order: Order =  {restaurant: {_id:'restaurantOne'}, items: [{ name:'itemOne', description: 'item decription'}], userId: 'userId'};
        const orderMap = new Map<string, Order>();
        orderMap.set('restaurantOne', order);
        service['currentOrders'] = orderMap;


        service.cancelOrder('restaurantOne');

        const emptyMap = new Map<string, Order>();

        expect( service['currentOrders']).toEqual(emptyMap);
    });

    it('should send order', fakeAsync(()=> {

        const orderSpy = spyOn(orderService, 'orderPost');

        const order: Order =  {restaurant: {_id:'restaurantOne'}, items: [{ name:'itemOne', description: 'item decription'}], userId: 'userId'};
        service.sendOrder(order);
        tick();

        expect(orderSpy).toHaveBeenCalledOnceWith({body: order});
    }));
});
