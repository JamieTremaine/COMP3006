import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { maxValue } from '../../utils/validators/maxValue';
import { minValue } from '../../utils/validators/minValue';
import { required } from '../../utils/validators/required';
import { OrderService } from '../../../svc/order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-menu-item',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent implements OnInit {

    private resturantId : string;

    menuItem: MenuItem = { id:"hello", name:'burgers', itemTypes: ['featured' ], image: null, description: 'yummy', price: 2.88, nutritionalInfo: { calories: 400}, 
        extras: [
            { required: false, name: 'pick one of these!', extras: [
                {name: 'no onions', NutritionalInfo: { calories: 40} },
                {name: 'no cheese', NutritionalInfo: { calories: 50} },
                {name: 'no buns', NutritionalInfo: { calories: 60} }
            ]},
            { required: false, name: 'Dont pick one of these!', extras: [
                {name: 'no onions', NutritionalInfo: { calories: 40} },
                {name: 'no cheese', NutritionalInfo: { calories: 50} },
                {name: 'no buns', NutritionalInfo: { calories: 60} }
            ]},
            { required: false, name: 'something pick one of these!', extras: [
                {name: 'no onions', NutritionalInfo: { calories: 40} },
                {name: 'no cheese', NutritionalInfo: { calories: 50} },
                {name: 'no buns', NutritionalInfo: { calories: 60} }
            ]}
        ] 
    }
    extrasForm: FormGroup;

    constructor(private orderService: OrderService, private activatedRoute: ActivatedRoute ) {
        this.extrasForm = new FormGroup({});
        this.resturantId = this.activatedRoute.snapshot.url[0].path;
    }

    ngOnInit(): void {
        this.createForm();
    }

    addToOrder() {
        const extras: Array<MenuExtras> = this.getExtras();

        let order: MenuItem = JSON.parse(JSON.stringify(this.menuItem));
        order.extras = extras;

        this.orderService.addToOrder(this.resturantId, order);  
    }

    private createForm(): void {
        const form = new FormGroup({});

        this.menuItem.extras.forEach((menuExtras) => {
            const subForm = new FormGroup({});

            menuExtras.extras.forEach((extra) => {
                subForm.addControl(extra.name, new FormControl(false))
            })
            subForm.addValidators(maxValue(menuExtras.max));
            subForm.addValidators(minValue(menuExtras.minimumRequired));
            subForm.addValidators(required());

            form.addControl(menuExtras.name, subForm);
        })

        this.extrasForm = form;
    }

    getExtras(): Array<MenuExtras> {
        const formValue = this.extrasForm.value;
        let extras: Array<{name: string, extras: Array<{name:string}>}> = [];
        Object.values(formValue).forEach((subExtraItem, i) => {

            let pushSubItem: boolean = false;
            let subExtraArr: Array<{name: string}> = [];

            const keys = Object.keys(subExtraItem as Object);

            Object.values(subExtraItem as Object).forEach((extra, j) => {
                if(extra === true) {
                    pushSubItem = true;

                    subExtraArr.push({name: keys[j].toString()});
                    Object.keys(formValue as Object)[i];
                }
            })

            if (pushSubItem) {
                extras.push({name: Object.keys(formValue as Object)[i], extras: subExtraArr});
            }   
        })

        return extras;
    }
}
