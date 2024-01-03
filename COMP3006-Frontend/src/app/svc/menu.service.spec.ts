import { TestBed } from '@angular/core/testing';

import { NgMenuService } from './menu.service';
import { Menu } from '../api/models';

describe('MenuService', () => {
    let service: NgMenuService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(NgMenuService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should set menu', () => {
        const menu: Menu = {restaurantName: 'restaurantname', MenuItems:[{name: 'menuname', price: 5.88}, {name: 'menuname2', price: 6.88}]};
        service.setMenu(menu);
        expect(service['menu']).toEqual(menu);
    })
});
