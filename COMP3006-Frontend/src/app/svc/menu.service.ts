import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private menu: any;

    constructor() { }
 
    getMenu(menuId: string): Promise<any> {
        if(menuId === this.menu.id){
            return this.menu;
        }

        return Promise.resolve('');
    }
}
