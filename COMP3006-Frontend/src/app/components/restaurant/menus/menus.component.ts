import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MenuService, RestaurantService } from '../../../api/services';
import { Menu, Restaurant } from '../../../api/models';
import { lastValueFrom } from 'rxjs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Severity, ToastService } from '../../../svc/toast.service';

@Component({
    selector: 'app-menus',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './menus.component.html',
    styleUrl: './menus.component.scss'
})
export class MenusComponent implements OnInit {
    resturantId?: string;
    restaurant?: Restaurant;
    menus?: Array<Menu>;
    currentMenuId?: string;

    constructor(
        private menuService: MenuService,
        private activatedRoute: ActivatedRoute, 
        private toaster: ToastService,
        private restaurantService: RestaurantService,
        private changeDet: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        if(this.activatedRoute.snapshot.paramMap.get('restaurantId') !== null) {
            this.resturantId = this.activatedRoute.snapshot.paramMap.get('restaurantId') as string;
        }

        this.loadMenus();
    }

    deleteMenu(menu: Menu) {
        if(menu._id === this.currentMenuId) {
            this.toaster.show("You cannot delete the currently active menu", Severity.danger, 5000);
            return;
        }

        lastValueFrom(this.menuService.menuMenuIdDelete({menuId: menu._id})).then((result)=> {
            this.toaster.show('menu deleted', Severity.success, 5000);
            this.loadMenus();
        });
    }


    loadMenus() {
        lastValueFrom(this.restaurantService.restaurantRestaurantIdGet({restaurantId: this.resturantId})).then((result) => {
            this.restaurant = result;
            this.currentMenuId = result.currentMenuId;
        }).catch(() => {
            this.toaster.show("Could not load restaurant", Severity.danger, 5000);
        });

        lastValueFrom(this.menuService.menuRestaurantIdAllGet({restaurantId: this.resturantId})).then((result) => {
            this.menus = result;
            this.changeDet.detectChanges();

        }).catch(() => {
            this.toaster.show("Could not load menus", Severity.danger, 5000);
        });
    }

    setAsCurrent(menuId?: string) {
        const restaurantCopy: Restaurant = JSON.parse(JSON.stringify(this.restaurant));
        restaurantCopy.currentMenuId = menuId;
        lastValueFrom(this.restaurantService.restaurantRestaurantIdPut({restaurantId: restaurantCopy?._id, body: restaurantCopy})).then((result) => {
            this.restaurant = result;
            this.currentMenuId = result.currentMenuId;
            this.toaster.show('Menu set as current', Severity.success, 5000);
        }).catch(()=> this.toaster.show('Menu could not be set', Severity.danger, 5000))
    }

}
