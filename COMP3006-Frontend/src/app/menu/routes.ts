import { Route } from "@angular/router";
import { MenuComponent } from "./menu/menu.component";
import { MenuListComponent } from "./menu-list/menu-list.component";

export const MENU_ROUTES : Route[] = [
    { path: '', component: MenuComponent },
    { path: 'menu-list', component: MenuListComponent },
];