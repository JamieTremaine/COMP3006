import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { PageComponent } from '../../utils/page/page.component';
import { HeaderService } from '../../../svc/header.service';
import { OrderService } from '../../../svc/order.service';

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
    menu?: any;

    items = [
        { id:"hello", name: 'burgers', itemType: ['featured', ], image: " ", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
        { id:"hello", name: 'sides', itemType: ['featured', ], image: " ", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
        { id:"hello", name: 'desserts', itemType: ['featured', ], image: " ", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
        { id:"hello", name: 'drinks', itemType: ['featured', ], image: "", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
        { id:"hello", name: 'drinks', itemType: ['featured', ], image: "", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
        { id:"hello", name: 'drinks', itemType: ['featured', ], image: " ", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
    ]

    constructor(protected override headerService: HeaderService, private orderService: OrderService, private activatedRoute: ActivatedRoute) {
        super(headerService);

        this.resturantId = this.activatedRoute.snapshot.url[0].path;
    }

    ngOnInit(): void {
        this.setHeader('Resturant Name');

        this.currentOrder = this.orderService.getOrder(this.resturantId);
    }

    getMenu() {

    }
}
