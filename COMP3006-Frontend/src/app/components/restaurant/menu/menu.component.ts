import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
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

    items = [
        { id:"hello", name: 'burgers', itemType: ['featured', ], image: " ", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
        { id:"hello", name: 'sides', itemType: ['featured', ], image: " ", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
        { id:"hello", name: 'desserts', itemType: ['featured', ], image: " ", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
        { id:"hello", name: 'drinks', itemType: ['featured', ], image: "", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
        { id:"hello", name: 'drinks', itemType: ['featured', ], image: "", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
        { id:"hello", name: 'drinks', itemType: ['featured', ], image: " ", description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400} },
    ]

    constructor(protected override headerService: HeaderService) {
        super(headerService);
    }

    ngOnInit(): void {
        this.setHeader('Resturant Name');
    }
}
