import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { WebsocketService } from '../../svc/websocket.service';
import { Location } from '@angular/common';
import { PersistanceService } from '../../svc/persistance.service';
import { NgUserService } from '../../svc/ng-user.service';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let websocketService: WebsocketService;
    let location: Location;
    let persistanceService: PersistanceService;
    let userService: NgUserService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [HeaderComponent],
        providers: [provideHttpClient(), provideHttpClientTesting()]
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        websocketService = TestBed.inject(WebsocketService);
        location = TestBed.inject(Location);
        persistanceService = TestBed.inject(PersistanceService);
        userService = TestBed.inject(NgUserService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display notifications', () => {
        expect(component.activeNotifications).toEqual(0);
        websocketService.statusChange.next('status');

        expect(component.activeNotifications).toEqual(1);

        expect(component.status).toEqual(['status']);
    });

    it('should go back to the previous page', () => {
        const locationSpy = spyOn(location, 'back');
        component.onBack();
        expect(locationSpy).toHaveBeenCalledTimes(1);
    });

    it('should set notifications to 0', () => {
        component.notificationsClicked();
        expect(component.activeNotifications).toBe(0);
    });

    it('should logout', () => {
        const persistanceSpy = spyOn(persistanceService, 'logout');
        const userSpy = spyOn(userService, 'logout');

        component.logout();

        expect(persistanceSpy).toHaveBeenCalledTimes(1);
        expect(userSpy).toHaveBeenCalledTimes(1);
    })
});
