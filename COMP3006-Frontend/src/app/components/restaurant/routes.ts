import { Route } from "@angular/router";
import { MenuComponent } from "./menu/menu.component";
import { MenuItemComponent } from "./menu-item/menu-item.component";

export const RESTAURANT_ROUTES : Route[] = [
    { path: ':resturantId', component: MenuComponent, pathMatch: 'full',
        children: [
            
            { path: 'menu/:itemId', component: MenuItemComponent }
        ]
    },
];