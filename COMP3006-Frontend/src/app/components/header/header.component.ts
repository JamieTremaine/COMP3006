import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgbDropdown, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderService } from '../../svc/header.service';
import { Location } from '@angular/common';
import { ngOrderService } from '../../svc/order.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [NgbDropdownModule, RouterLink],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit, OnDestroy {

    activeOrders: number = 0;
    private destroy$ = new Subject<void>();

    constructor(protected headerService: HeaderService, private location: Location, public orderService: ngOrderService) {}

    ngOnInit(): void {
       this.orderService.activeOrders
        .pipe(takeUntil(this.destroy$)).subscribe((activeOrders) => this.activeOrders = activeOrders);
    }

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    onBack(): void {
        this.location.back()
    }

}
