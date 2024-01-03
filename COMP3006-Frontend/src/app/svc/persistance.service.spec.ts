import { TestBed } from '@angular/core/testing';

import { PersistanceService } from './persistance.service';
import { Order, User } from '../api/models';

describe('PersistanceService', () => {
    let service: PersistanceService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PersistanceService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get user', () => {

        const user: User = {username: 'name', type: 'user', _id:'userid'} ;
        spyOn(window.localStorage, 'getItem').withArgs('restaurant-ordering-system-user-info').and.returnValue(JSON.stringify(user));

        const returnedUser = service.getUser();
        expect(returnedUser).toEqual(user);
    })

    it('should remove order', () => {
        let localStorageValue = { key: '', value: '' };

        const orders: Order[] = [
            { restaurant: {_id:'restaurantOne'}, items: [{ name:'itemOne', description: 'item decription'}], userId: 'userOne' },
            { restaurant: {_id:'restaurantTwo'}, items: [{ name:'itemOne', description: 'item decription'}], userId: 'userOne' }
        ];

        spyOn(service as any, 'getOrdersFromLocalStorage').and.returnValue(orders);
        spyOn(window.localStorage, 'setItem').and.callFake((key, value) => localStorageValue = { key: key,  value: value });

        service.removeOrder('userOne', 'restaurantOne');

        expect(localStorageValue).toEqual({key: 'restaurant-ordering-system-user-orders', value: JSON.stringify([orders[0]])})
    })

    it('shoult get order for a user', () => {

        const orders: Order[] = [
            { restaurant: {_id:'restaurantOne'}, items: [{ name:'itemOne', description: 'item decription'}], userId: 'userOne' },
            { restaurant: {_id:'restaurantTwo'}, items: [{ name:'itemOne', description: 'item decription'}], userId: 'userTwo' }
        ];

        spyOn(service as any, 'getOrdersFromLocalStorage').and.returnValue(orders);

        const returnedOrders = service.getOrders('userOne');

        expect(returnedOrders).toEqual([orders[0]]);
    })

    it('should logout', () => {

        const removeSpy = spyOn(window.localStorage, 'removeItem');

        service.logout()
        expect(removeSpy).toHaveBeenCalledOnceWith('restaurant-ordering-system-user-info');
    });
});
