import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.scss'
})

export class MenuListComponent implements OnInit {

    type: string = '';
    items: any = [
        { image: '', imageAlternateText: 'burger', title: 'Single Cheeseburger', description: '100% beef patty, two slices of cheese, onions and bacon', price: 1.20 },
        { image: '', imageAlternateText: 'burger', title: 'Double Cheeseburger', description: 'Two 100% beef patties, four slices of cheese, onions and bacon', price: 3.59 },
        { image: '', imageAlternateText: 'burger', title: 'Triple Cheeseburger', description: 'Three 100% beef patties, four slices of cheese, onions and bacon', price: 0 },
        { image: '', imageAlternateText: 'burger', title: 'Triple Cheeseburger', description: '', price: 0 },
        { image: '', imageAlternateText: 'burger', title: 'Triple Cheeseburger', description: '', price: 0 },
        { image: '', imageAlternateText: 'burger', title: 'Triple Cheeseburger', description: '', price: 0 },
    ];

    constructor(private router: Router, private activatedRoute: ActivatedRoute){}

    ngOnInit(): void {
        this.activatedRoute.queryParams.forEach((param) => {
            this.type = param['type'];
        })
        // lastValueFrom(this.load())
        // .then((result) => {
        //         //this.items = result;
                
        //     })
        // .catch()
        // .finally()
    }

    displayItem(itemToAdd: any) {

    }

    private load(): any {
        return null
    }

}
