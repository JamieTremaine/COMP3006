import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService implements OnInit, OnDestroy {

  private _showBack: boolean = false;
  private routerSub: Subscription | undefined
  currentTitle: string = 'Resturant Ordering System';

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.routerSub = this.router.events.subscribe((event)=>{
      if (event instanceof NavigationEnd) {
        this._showBack = event.url === '' ? false : true
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
