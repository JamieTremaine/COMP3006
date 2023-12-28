import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class HeaderService implements OnDestroy {

    private _showBack: boolean = false;
    private routerSub: Subscription | undefined
    currentTitle?: string = 'Resturant Ordering System';

    constructor(private router: Router) {
        this.routerSub = this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {

                if(event.url === '/' || event.url === '/login') {
                    this._showBack = false;
                } else {
                    this._showBack = true;
                }
            }
        })
    }

    ngOnDestroy(): void {
        this.routerSub?.unsubscribe();
    }

    public get showBack() : boolean {
        return this._showBack
    }
}
