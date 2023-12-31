import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../svc/header.service';
import { Location } from '@angular/common';
import { NgOrderService } from '../../svc/order.service';
import { Subject, takeUntil } from 'rxjs';
import { NgUserService } from '../../svc/ng-user.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgbDropdownModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

    activeOrders: number = 0;
    loggedIn: boolean = false;
    private destroy$ = new Subject<void>();

    constructor(protected headerService: HeaderService, private location: Location, public orderService: NgOrderService, public userService: NgUserService) {}

    ngOnInit(): void {
        this.activeOrders = this.orderService.getNumOrder();
       this.orderService.activeOrders
        .pipe(takeUntil(this.destroy$)).subscribe((activeOrders) => this.activeOrders = activeOrders);

        this.loggedIn = this.userService.isLoggedIn();
        this.userService.LoggedInSubject
        .pipe(takeUntil(this.destroy$)).subscribe((loggedIn) => this.loggedIn = loggedIn);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onBack(): void {
        this.location.back()
    }
}
