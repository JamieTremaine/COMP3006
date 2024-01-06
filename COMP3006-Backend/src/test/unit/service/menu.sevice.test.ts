import { IMenu, MenuModel } from "../../../model/menu";
import { MenuService } from "../../../svc/menu.service";


describe('menu service', () =>{

    const menuService = new MenuService();

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    it('should get restaurant menus', async () => {
        const menus: Array<IMenu> = [
            { _id: 'menuOne', restaurantId: 'id', restaurantName: 'name'},
            { _id: 'menuTwo', restaurantId: 'id', restaurantName: 'name'},

        ]

        MenuModel.find = jest.fn().mockResolvedValue(Promise.resolve(menus));

        const result = await menuService.getrestaurantMenus('restaurantIdTest');

        expect(result).toEqual(menus);
    });

    it('should set restaurant menus', async () => {
        const menu: IMenu = { _id: '', restaurantId: 'id', restaurantName: 'name'}

        const expectedReturnMenu: IMenu = { _id: 'addedId', restaurantId: 'id', restaurantName: 'name'}

        MenuModel.create = jest.fn().mockResolvedValue(Promise.resolve(expectedReturnMenu));

        const result = await menuService.setMenu(menu);

        expect(result).toEqual(expectedReturnMenu);
    });

    it('should delete menu ', async () => {
        MenuModel.findByIdAndDelete = jest.fn().mockImplementation((id) => {
            return id === 'deleteMenuId' ? Promise.resolve({_id: 'menuId'}) : Promise.resolve(null)
        });

        let result = await menuService.deleteMenu('deleteMenuId');
        expect(result).toEqual(true);

        result = await menuService.deleteMenu('deleteMenuIdWrong');
        expect(result).toEqual(false);
    });
});
