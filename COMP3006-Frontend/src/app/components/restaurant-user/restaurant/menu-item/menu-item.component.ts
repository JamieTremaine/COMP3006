import { CommonModule, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MenuService } from '../../../../api/services';
import { NgMenuService } from '../../../../svc/menu.service';
import { NgOrderService } from '../../../../svc/order.service';
import { ToastService, Severity } from '../../../../svc/toast.service';

@Component({
    selector: 'app-menu-item',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './menu-item.component.html',
    styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent implements OnInit {

    private resturantId: string;
    private menuItemId: string;

    menuItem?: MenuItem 
    extrasForm?: FormGroup;

    constructor(private orderService: NgOrderService, 
        private activatedRoute: ActivatedRoute, 
        private ngMenuService: NgMenuService, 
        private menuService: MenuService, 
        private toaster: ToastService,
        private location: Location ) {

        this.resturantId = this.activatedRoute.snapshot.url[0]?.path;
        this.menuItemId = this.activatedRoute.snapshot.url[2]?.path;
    }

    ngOnInit(): void {
        this.menuItem = this.getMenuItem();
        if(!this.menuItem) {
            this.loadMenuItem();

        }
        this.createForm();
    }

    loadMenuItem() {
        lastValueFrom( this.menuService.menuRestaurantIdCurrentGet({restaurantId: this.resturantId})).then((result)=>{
            this.ngMenuService.setMenu(result);
            this.menuItem = this.getMenuItem();
            this.createForm();
        })    
    }

    getMenuItem(): MenuItem | undefined {
        const menu = this.ngMenuService.getMenu();
        return menu?.MenuItems?.find(item => item._id === this.menuItemId);
    }

    addToOrder() {
        const extras: Array<MenuExtras> = this.getExtras();

        let order: MenuItem = JSON.parse(JSON.stringify(this.menuItem));
        order.extras = extras;

        this.orderService.addToOrder(this.resturantId, order);  
        this.toaster.show('Order added', Severity.success, 5000);
        this.location.back()
    }

    getExtras(): Array<MenuExtras> {
        const formValue = this.extrasForm?.value;
        let extras: Array<{name: string, extras: Array<{name:string}>}> = [];

        //Convert key value(boolean) pairs into MenuExtras object containing only the set extras
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

    private createForm(): void {
        const form = new FormGroup({});

        if(this.menuItem?.extras) {       
            this.menuItem.extras.forEach((menuExtras) => {
                const subForm = new FormGroup({});

                menuExtras?.extras?.forEach((extra) => {
                    if (extra?.name) {
                        subForm.addControl(extra.name, new FormControl(false))
                    }
                })

                if (menuExtras.name) {
                    form.addControl(menuExtras.name, subForm);
                }
            })

            this.extrasForm = form;
        }
    }
}
