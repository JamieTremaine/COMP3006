import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResturantHomeComponent } from './home.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Order } from '../../../api/models';
import { WebsocketService } from '../../../svc/websocket.service';

describe('ResturantHomeComponent', () => {
    let component: ResturantHomeComponent;
    let fixture: ComponentFixture<ResturantHomeComponent>;
    let websocketService: WebsocketService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
        imports: [ResturantHomeComponent],
        providers: [provideHttpClient(), provideHttpClientTesting()]
        })
        .compileComponents();
        
        fixture = TestBed.createComponent(ResturantHomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        websocketService = TestBed.inject(WebsocketService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should sent the next order stage', () => {

        const websocketSpy = spyOn(websocketService, 'sendMessage');
        const order: Order = { _id:'orderId', stage: 'recieved' };

        component.nextStage(order);
        expect(websocketSpy).toHaveBeenCalledOnceWith('Your order is being prepared', 'orderId');

        websocketSpy.calls.reset();

        component.nextStage(order);
        expect(websocketSpy).toHaveBeenCalledOnceWith('Your order is out for delivery', 'orderId');

        websocketSpy.calls.reset();

        component.nextStage(order);
        expect(websocketSpy).toHaveBeenCalledOnceWith('Order delivered!', 'orderId');


    });
});
