import { Injectable } from '@angular/core';
import { Menu } from '../api/models';

@Injectable({
    providedIn: 'root'
})
export class NgMenuService {

    private menu?: Menu;

    constructor() { }
 
    getMenu(): Menu | undefined {
        return this.menu;
    }

    setMenu(menu: Menu) {
        this.menu = menu;
    }


}
