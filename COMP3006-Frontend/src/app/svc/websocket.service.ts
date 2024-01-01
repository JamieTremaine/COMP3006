import { Injectable, OnDestroy } from '@angular/core';
import { NgUserService } from './ng-user.service';
import { Subject, takeUntil } from 'rxjs';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from '@socket.io/component-emitter';
import { NgOrderService } from './order.service';
import { Order } from '../api/models';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService implements OnDestroy {

    private destroy$ = new Subject<void>();
    private socket?: Socket<DefaultEventsMap, DefaultEventsMap> 

    onMessage = new Subject<void>();



  constructor(private ngUSerService: NgUserService, private ngOrderSerive: NgOrderService) {
        if (this.ngUSerService.isLoggedIn()) {
            this.startSocket();
        } else {
            this.ngUSerService.LoggedInSubject.pipe(takeUntil(this.destroy$)).subscribe((login) => {
                if (login === true) {
                    this.startSocket();
                }
            })
        }
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();

        this.socket?.close();
    }

    startSocket() {
        this.socket = io('http://localhost:3000');
        this.socket.emit('connection-details', this.ngUSerService.getUser()?._id);

        this.socket.onAny((message)=> {
            this.onMessage.next();
        })

        this.socket.on('new-order', (message)=> {
            this.ngOrderSerive.addNewOrder(message as Order);
        })
    }

    sendMessage(status: string, orderId?: string) {
        if(this.socket) {
            this.socket.emit('status-change', {status: status, orderId: orderId});
        }
       
    }
}
