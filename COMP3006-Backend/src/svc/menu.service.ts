import { IMenu, MenuModel } from "../model/menu";


export class MenuService {

    private static menuService?: MenuService;

    private constructor(){}


    public static getService(): MenuService {
        if(MenuService.menuService === undefined) {
            MenuService.menuService = new MenuService()
        }
        return MenuService.menuService;
    }

    public async getMenu(menuId: string): Promise<IMenu | null> {
        return await MenuModel.findById(menuId);
    }

    public async getrestaurantMenus(restaurantId: string): Promise<Array<IMenu>> {
        return await MenuModel.find({restaurantId: restaurantId})
    }

    public async setMenu(menu: IMenu, menuId?: string): Promise<IMenu | null> {
        let menuResult: IMenu | null;

        if (menuId) {
            menuResult = await MenuModel.findByIdAndUpdate(menuId, menu)
        } else {
            menuResult = await MenuModel.create(menu);
        }

        return menuResult;
    }

    public async deleteMenu(menuId: string): Promise<boolean> {
        const result = await MenuModel.findByIdAndDelete(menuId);
        return !!result.value
    }
}