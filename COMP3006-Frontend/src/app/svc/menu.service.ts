import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private menu: Array<any> = [];

    constructor() { }
 
    getMenu(): Array<any> {
        return this.menu;
    }

    setMenu(menu: Array<any>) {
        this.menu = menu;
    }

    getMenuSubItems(itemType: string): Array<any> {
        return this.menu.filter((item)=> item === itemType);
    }

    getMenuItem(itemId: any) {
        return this.menu.find((item)=> item.id === itemId);
    }
}
