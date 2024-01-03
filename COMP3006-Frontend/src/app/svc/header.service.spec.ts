import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { HeaderService } from './header.service';
import { Router, provideRouter } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { LoginComponent } from '../components/login/login.component';
import { CreateAccountComponent } from '../components/create-account/create-account.component';
import { OrderComponent } from '../components/restaurant-user/orders/order/order.component';
import { CurrentOrdersComponent } from '../components/restaurant-user/orders/current-orders/current-orders.component';

describe('HeaderService', () => {
    let service: HeaderService;
    let router: Router;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ provideRouter(
                [
                    { path: '', component: HomeComponent }, 
                    { path: 'login', component: LoginComponent }, 
                    { path: 'create-account', component: CreateAccountComponent },
                    { path: 'order', component: OrderComponent },
                    { path: 'current-order', component: CurrentOrdersComponent },
                ]
            )]
        });
        service = TestBed.inject(HeaderService);
        router = TestBed.get(Router);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should hide back buttons on certain routes', fakeAsync(() => {
        expect(service['_showBack']).toBeFalse();

        router.navigate(['']);
        tick();

        expect(service['_showBack']).toBeFalse();

        router.navigate(['login']);
        tick();

        expect(service['_showBack']).toBeFalse();

        router.navigate(['create-account']);
        tick();

        expect(service['_showBack']).toBeFalse();
    }));

    it('should show back buttons on certain routes', fakeAsync(() => {
        expect(service['_showBack']).toBeFalse();

        router.navigate(['order']);
        tick();

        expect(service['_showBack']).toBeTrue();

        router.navigate(['current-order']);
        tick();

        expect(service['_showBack']).toBeTrue();
    }));
});
