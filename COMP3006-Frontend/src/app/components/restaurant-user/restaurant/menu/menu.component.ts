import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PageComponent } from '../../../utils/page/page.component';
import { Menu } from '../../../../api/models';
import { MenuService } from '../../../../api/services';
import { HeaderService } from '../../../../svc/header.service';
import { NgMenuService } from '../../../../svc/menu.service';
import { NgOrderService } from '../../../../svc/order.service';


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
        private orderService: NgOrderService, 
        private activatedRoute: ActivatedRoute, 
        private menuService: MenuService, 
        private ngMenuService: NgMenuService) {
        super(headerService);

        this.resturantId = this.activatedRoute.snapshot.url[0]?.path;
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
