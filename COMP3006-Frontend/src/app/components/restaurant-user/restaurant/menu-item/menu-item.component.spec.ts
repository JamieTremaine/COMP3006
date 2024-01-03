import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MenuItemComponent } from './menu-item.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MenuService, OrderService } from '../../../../api/services';
import { of } from 'rxjs';
import { NgMenuService } from '../../../../svc/menu.service';
import { Menu } from '../../../../api/models';
import { NgOrderService } from '../../../../svc/order.service';
import { FormGroup } from '@angular/forms';

describe('MenuItemComponent', () => {
    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;
    let menuService: MenuService;
    let ngMenuService: NgMenuService;
    let orderService: NgOrderService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [MenuItemComponent],
        providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(MenuItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        menuService = TestBed.inject(MenuService);
        ngMenuService = TestBed.inject(NgMenuService);
        orderService = TestBed.inject(NgOrderService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load menu item', fakeAsync(() => {
        const menu: Menu = { _id: 'menuId', MenuItems: [ { _id: 'menuId', name: 'menuName', description: 'menu description', extras:[{ name: 'extraName'}]}]}
        spyOn(menuService, 'menuRestaurantIdCurrentGet').and.returnValue(of(menu))
        const ngMenuSpy = spyOn(ngMenuService, 'setMenu').and.callThrough();

        component['menuItemId'] = 'menuId';

        component.loadMenuItem();
        tick();

        expect(ngMenuSpy).toHaveBeenCalledOnceWith(menu);
        expect(component.menuItem).toEqual(menu.MenuItems![0]);
    }));

    it('should add to order', () => {
        const menuExtras: MenuExtras[] = [{name: 'extraName', extras: [{name:'nameOne'}]}, {name: 'extraNameTwo', extras: [{name:'nameTwo'}]}];
        spyOn(component, 'getExtras').and.returnValue(menuExtras);

        const menuItem: MenuItem = { _id: 'item', name: 'name', extras: menuExtras };
        component.menuItem = menuItem;
        component['resturantId'] = 'resturantId'
        const orderSpy = spyOn(orderService, 'addToOrder')

        component.addToOrder();

        expect(orderSpy).toHaveBeenCalledOnceWith('resturantId', menuItem);
    })
});
