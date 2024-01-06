import supertest from "supertest";
import { getMenuWithId, getMenuNoId } from "./util/menu.util";
import { MenuModel, IMenu } from "../../model/menu";
import { RestaurantModel } from "../../model/restaurant";
import { app } from "../../server";

describe('menu e2e', () => {

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get menu', async() => {
        const menuMock = getMenuWithId();
            
        MenuModel.findById = jest.fn().mockImplementation((id) => {
            return id === '6592122de52f99e1b07899e6' ? Promise.resolve(menuMock) : Promise.resolve(null);
        });

        const { body } = await supertest(app).get('/api/v1/menu/6592122de52f99e1b07899e6').expect(200);

        expect(body).toEqual(menuMock);
    });

    it('should get current menu', async() => {
    const menuMock = getMenuWithId();

    const restaurantMock = {
        "_id": "6592122ce52f99e1b07899dc",
        "description": "Guaranteed speed without a clown in sight",
        "name": "McRonalds",
        "restaurantType": [
            "american",
            "burger",
            "chicken"
        ],
        "__v": 0,
        "currentMenuId": "6592122de52f99e1b07899e6"
    }

    RestaurantModel.findById =jest.fn().mockImplementation((id) => {
        return id === '6592122ce52f99e1b07899dc' ? Promise.resolve(restaurantMock) : Promise.resolve(null);
    });
        
    MenuModel.findById = jest.fn().mockImplementation((id) => {
        return id === '6592122de52f99e1b07899e6' ? Promise.resolve(menuMock) : Promise.resolve(null);
    });

    const { body } = await supertest(app).get('/api/v1/menu/6592122ce52f99e1b07899dc/current').expect(200);

    expect(body).toEqual(menuMock);
});

    it('should add a new menu', async () => {
        const menu = getMenuNoId();

        MenuModel.create = jest.fn().mockImplementation((menu) => {
            const menuCopy: IMenu = JSON.parse(JSON.stringify(menu));
            menuCopy._id = '6592122de52f99e1b07899e6';

            return Promise.resolve(menuCopy);
        });

        const { body } = await supertest(app).post('/api/v1/menu')
            .send(menu)
            .expect(201);

        const expectedResult = JSON.parse(JSON.stringify(menu));
        expectedResult._id = '6592122de52f99e1b07899e6';

        expect(body).toEqual(expectedResult);
    });

    it('should update menu', async () => {
        const menu = getMenuWithId();

        const mock = jest.fn().mockImplementation((menu) => {
            return Promise.resolve(menu);
        });

        MenuModel.findByIdAndUpdate = mock;

        await supertest(app).put('/api/v1/menu/6592122de52f99e1b07899e6')
            .send(menu)
            .expect(204);

        expect(mock).toHaveBeenCalledWith('6592122de52f99e1b07899e6', menu);
    });

    it('should delete menu', async () => {
        const menu = getMenuWithId();

        const mock = jest.fn().mockImplementation(() => {
            return Promise.resolve(menu);
        });

        MenuModel.findByIdAndDelete = mock;

        await supertest(app).delete('/api/v1/menu/6592122de52f99e1b07899e6')
            .send(menu)
            .expect(200);

        expect(mock).toHaveBeenCalledWith('6592122de52f99e1b07899e6');
    });
});