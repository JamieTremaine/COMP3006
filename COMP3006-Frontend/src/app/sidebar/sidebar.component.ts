import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [NgbNavModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent implements OnInit, OnDestroy {

    private routeSub: Subscription | undefined;
    active = '';

    navbarRoutes = ['', 'order', 'menu'];

    constructor(private router: Router){}

    ngOnInit(): void {
        this.routeSub = this.router.events.subscribe((event) =>{
            if (event instanceof NavigationEnd) {
                //The sub url we care about is always at index 1 e.g '/menu, /menu/menu-list, /order/'
                const url = event.url.split('/')[1]; 
                if (this.navbarRoutes.includes(url)) {
                    this.active = url
                }
            }
        })
    }

    ngOnDestroy(): void {
       if (this.routeSub) {
        this.routeSub.unsubscribe();
       }
    }

  

}
