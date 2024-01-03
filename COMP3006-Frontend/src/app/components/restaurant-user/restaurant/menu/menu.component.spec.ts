import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { MenuService } from '../../../../api/services';
import { Inject } from '@angular/core';
import { of } from 'rxjs';
import { Menu } from '../../../../api/models';
import { NgMenuService } from '../../../../svc/menu.service';

describe('MenuComponent', () => {
    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let menuService: MenuService;
    let ngMenuService: NgMenuService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [MenuComponent],
        providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])]
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(MenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        menuService = TestBed.inject(MenuService);
        ngMenuService = TestBed.inject(NgMenuService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get menu', fakeAsync(() => {
        const menu: Menu = {_id: 'menuid', restaurantName: 'restaurent', MenuItems: [{_id:'item', name:'name'}]};
        spyOn(menuService, 'menuRestaurantIdCurrentGet').and.returnValue(of(menu))
        const ngMenuServiceSpy = spyOn(ngMenuService, 'setMenu');

        component.getMenu();
        tick(); 
        expect(ngMenuServiceSpy).toHaveBeenCalledOnceWith(menu);
    }));
});
