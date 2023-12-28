import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PageComponent } from '../../utils/page/page.component';
import { HeaderService } from '../../../svc/header.service';
import { ngOrderService } from '../../../svc/order.service';
import { MenuService } from '../../../api/services';
import { lastValueFrom, map } from 'rxjs';
import { Menu } from '../../../api/models';
import { NgMenuService } from '../../../svc/menu.service';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.scss'
})

export class MenuComponent extends PageComponent {

    resturantId: string;
    menuId?: string;
    currentOrder?: any;
    resturant?: any;
    menu?: Menu;

    constructor(protected override headerService: HeaderService, 
        private orderService: ngOrderService, 
        private activatedRoute: ActivatedRoute, 
        private menuService: MenuService, 
        private ngMenuService: NgMenuService) {
        super(headerService);

        this.resturantId = this.activatedRoute.snapshot.url[0].path;
    }

    ngOnInit(): void {
        this.currentOrder = this.orderService.getOrder(this.resturantId);
        this.getMenu();

    }

    getMenu() {
        lastValueFrom(this.menuService.menuRestaurantIdCurrentGet({restaurantId: this.resturantId})).then((result) => {
            this.menu = result;
            this.ngMenuService.setMenu(result);
            this.setHeader(result.restaurantName);
        })
      
    }
}
