import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../svc/header.service';
import { Location } from '@angular/common';
import { NgOrderService } from '../../svc/order.service';
import { Subject, takeUntil } from 'rxjs';
import { NgUserService } from '../../svc/ng-user.service';
import { WebsocketService } from '../../svc/websocket.service';
import { PersistanceService } from '../../svc/persistance.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgbDropdownModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

    activeOrders: number = 0;
    activeNotifications = 0;
    loggedIn: boolean = false;
    status: Array<string> = [];
    private destroy$ = new Subject<void>();

    constructor(
        protected headerService: HeaderService, 
        private location: Location, 
        public orderService: NgOrderService, 
        public userService: NgUserService, 
        private websocketService: WebsocketService,
        private persistanceService: PersistanceService,
        ) {}

    ngOnInit(): void {
        this.activeOrders = this.orderService.getNumOrder();
       this.orderService.activeOrders
        .pipe(takeUntil(this.destroy$)).subscribe((activeOrders) => this.activeOrders = activeOrders);

        this.loggedIn = this.userService.isLoggedIn();
        this.userService.LoggedInSubject
        .pipe(takeUntil(this.destroy$)).subscribe((loggedIn) => this.loggedIn = loggedIn);

        this.websocketService.statusChange
        .pipe(takeUntil(this.destroy$)).subscribe((status) => { 
            this.activeNotifications++;
            this.status.push(status); 
            if(this.status.length > 4) {
                this.status.shift();
            }
        })
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onBack(): void {
        this.location.back()
    }

    notificationsClicked() {
        this.activeNotifications = 0;   
    }

    logout() {
        this.persistanceService.logout();
        this.userService.logout()
    }
}
