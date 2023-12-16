import { IMenuItem, MenuItem } from "../model/menuItem";

export class MenuService {

    public async getMenu(): Promise<Array<IMenuItem>> {
        const result = await MenuItem.find();
        console.log(result);
        return result;
    }
}