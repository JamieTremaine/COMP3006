import supertest from "supertest";
import { menuRoutes } from "../../../controllers/menu.controller";
import { IMenu } from "../../../model/menu";
import { IRestaurant } from "../../../model/restaurant";
import { app } from "../../../server";
import { MenuService } from "../../../svc/menu.service";
import { RestaurantService } from "../../../svc/restaurant.service";


describe('menu controller', () => {

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    describe('routes', () =>{
        const routes = [
            { path: '/menu/:menuId', method: 'get' },
            { path: '/menu/:restaurantId/current', method: 'get' },
            { path: '/menu/:restaurantId/all', method: 'get' },
            { path: '/menu', method: 'post' },
            { path: '/menu/:menuId', method: 'put' },
            { path: '/menu/:menuId', method: 'delete' },
          ]
    
          it.each(routes)('`$method` exists on $path', (route) => {
            expect(menuRoutes.stack.some((s) => Object.keys(s.route.methods).includes(route.method))).toBe(true)
            expect(menuRoutes.stack.some((s) => s.route.path === route.path)).toBe(true)
          });
    });

    describe('/menu/:menuId', () => {

        it('should return 200 and menu', async () => {

            const menuResponse: IMenu = {_id: 'testMenuId', restaurantId: 'restuarantId', restaurantName: 'name', MenuItems: [] };

            const getMenuSpy = jest.spyOn(MenuService.prototype, 'getMenu').mockImplementation((id) =>{ 
                return id === 'testMenuId' ? Promise.resolve(menuResponse) : Promise.resolve(null)
            } )

            const {body, statusCode} = await supertest(app).get('/api/v1/menu/testMenuId').expect(200);

            expect(getMenuSpy).toHaveBeenCalledWith('testMenuId')
            expect(body).toEqual(menuResponse);
        });

        it('should return 404', async () => {

            const menuResponse: IMenu = {_id: 'testMenuId', restaurantId: 'restuarantId', restaurantName: 'name', MenuItems: [] };

            const getMenuSpy = jest.spyOn(MenuService.prototype, 'getMenu').mockImplementation((id) =>{ 
                return id === 'testMenuId' ? Promise.resolve(menuResponse) : Promise.resolve(null);
            });

            const {body, statusCode} = await supertest(app).get('/api/v1/menu/wrongid').expect(404);

            expect(getMenuSpy).toHaveBeenCalledWith('wrongid');
            expect(body).toEqual({});
        });
    });

    describe('/menu/:restaurantId/current', () =>{
        it('should return 200 and restaurant', async () => {
            const restaurant: IRestaurant = {
                currentMenuId: 'currentMenuId',
                name: "",
                description: ""
            };

            const menuResponse: IMenu = {_id: 'testMenuId', restaurantId: 'restuarantId', restaurantName: 'name', MenuItems: [] };

            const getRestaurantSpy = jest.spyOn(RestaurantService.prototype, 'getRestaurant').mockImplementation((id) =>{ 
                return id === 'restaurantIdTest' ? Promise.resolve(restaurant) : Promise.resolve(null)
            });

            const getMenuSpy = jest.spyOn(MenuService.prototype, 'getMenu').mockImplementation((id) =>{ 
                return id === 'currentMenuId' ? Promise.resolve(menuResponse) : Promise.resolve(null);
            });

            const {body, statusCode} = await supertest(app).get('/api/v1/menu/restaurantIdTest/current').expect(200);

            expect(getRestaurantSpy).toHaveBeenCalledWith('restaurantIdTest');
            expect(getMenuSpy).toHaveBeenCalledWith('currentMenuId');
            expect(body).toEqual(menuResponse);
        });

        it('should return 404', async () => {

            const restaurant: IRestaurant = {
                currentMenuId: 'currentMenuId',
                name: "",
                description: ""
            };

            const menuResponse: IMenu = {_id: 'testMenuId', restaurantId: 'restuarantId', restaurantName: 'name', MenuItems: [] };

            const getRestaurantSpy = jest.spyOn(RestaurantService.prototype, 'getRestaurant').mockImplementation((id) =>{ 
                return id === 'restaurantIdTest' ? Promise.resolve(restaurant) : Promise.resolve(null)
            });

            const {body, statusCode} = await supertest(app).get('/api/v1/menu/wrongRestaurantId/current').expect(404);

            expect(getRestaurantSpy).toHaveBeenCalledWith('wrongRestaurantId');
            expect(body).toEqual({});
        });
    });

    describe('/menu/:restaurantId/all', () =>{
        it('should return 200 and restaurant array', async () => {
            const restaurants: Array<IMenu> = [
                { _id: 'currentMenuIdOne', restaurantId: 'restaurantIdTest', restaurantName: 'name' },
                { _id: 'currentMenuIdTwo', restaurantId: 'restaurantIdTest', restaurantName: 'name' },
            ]


            const getMenusSpy = jest.spyOn(MenuService.prototype, 'getrestaurantMenus').mockImplementation((id) =>{ 
                return id === 'restaurantIdTest' ? Promise.resolve(restaurants) : Promise.resolve([]);
            });

            const {body, statusCode} = await supertest(app).get('/api/v1/menu/restaurantIdTest/all').expect(200);

            expect(getMenusSpy).toHaveBeenCalledWith('restaurantIdTest');
            expect(body).toEqual(restaurants);
        });

        it('should return 404', async () => {

            const restaurants: Array<IMenu> = [
                { _id: 'currentMenuIdOne', restaurantId: 'restaurantIdTes', restaurantName: 'name' },
                { _id: 'currentMenuIdTwo', restaurantId: 'restaurantIdTes', restaurantName: 'name' },
            ]

            const getMenusSpy = jest.spyOn(MenuService.prototype, 'getrestaurantMenus').mockImplementation((id) =>{ 
                return id === 'restaurantIdTest' ? Promise.resolve(restaurants) : Promise.resolve([]);
            });

            const {body, statusCode} = await supertest(app).get('/api/v1/menu/wrongRestaurantId/all').expect(404);

            expect(getMenusSpy).toHaveBeenCalledWith('wrongRestaurantId');
            expect(body).toEqual({});
        });
    });

    describe('/menu', () =>{
        it('should return 201 and return created menu', async () => {

            const menu: IMenu = {_id: '', restaurantId: 'resturantId', restaurantName: 'name', MenuItems: [
                { _id: 'itemId', name: 'itemName', description: '', price: 2.99 , itemTypes: [''], allegens: [''] ,extras: [], nutritionalInfo: {calories:1}}
            ]};

            const returnedMenu: IMenu = {_id: 'addedId', restaurantId: 'resturantId', restaurantName: 'name', MenuItems: [
                { _id: 'itemId', name: 'itemName', description: '', price: 2.99 , itemTypes: [''], allegens: [''] ,extras: [], nutritionalInfo: {calories:1}}
            ]};

            const getMenusSpy = jest.spyOn(MenuService.prototype, 'setMenu').mockImplementation((menu) => { 
                let menuCopy = JSON.parse(JSON.stringify(menu));
                menuCopy._id = 'addedId'
                return Promise.resolve(menuCopy);
            });

            const {body, statusCode} = await supertest(app).post('/api/v1/menu').send(menu).expect(201);

            expect(getMenusSpy).toHaveBeenCalledWith(menu);
            expect(body).toEqual(returnedMenu);
        });
    });

    describe('/menu/:menuId', () =>{
        it('should return 200', async () => {

            const getMenusSpy = jest.spyOn(MenuService.prototype, 'deleteMenu').mockImplementation((id) =>{ 
                return Promise.resolve(true);
            });

            const {body, statusCode} = await supertest(app).delete('/api/v1//menu/restaurantIdTest').expect(200);

            expect(getMenusSpy).toHaveBeenCalledWith('restaurantIdTest');
        });

        it('should return 404', async () => {

            const getMenusSpy = jest.spyOn(MenuService.prototype, 'deleteMenu').mockImplementation((id) =>{ 
                return Promise.resolve(false);
            });

            const {body, statusCode} = await supertest(app).delete('/api/v1//menu/restaurantIdTest').expect(404);

            expect(getMenusSpy).toHaveBeenCalledWith('restaurantIdTest');
        });
    });
});