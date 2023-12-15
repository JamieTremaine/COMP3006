import { MenuItem } from "../model/menuItem";

export class MenuService {

    public getMenu(): Array<MenuItem> {
        return [new MenuItem()];
    }
}