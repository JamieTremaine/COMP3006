import supertest from "supertest";
import { restaurantRoutes } from "../../../src/controllers/restaurant.controller";
import { IRestaurant } from "../../../src/model/restaurant";
import { RestaurantService } from "../../../src/svc/restaurant.service";
import { app } from "../../../src/server";


describe('restaurant order', () => {

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    describe('routes', () =>{
        const routes = [
            { path: '/restaurant/:restaurantId', method: 'get' },
            { path: '/restaurant/get/all', method: 'get' },
            { path: '/restaurant/:restaurantId', method: 'put' },
            { path: '/restaurant', method: 'post' },
            { path: '/restaurant/:restaurantId', method: 'delete' },
          ];
    
          it.each(routes)('`$method` exists on $path', (route) => {
            expect(restaurantRoutes.stack.some((s) => Object.keys(s.route.methods).includes(route.method))).toBe(true)
            expect(restaurantRoutes.stack.some((s) => s.route.path === route.path)).toBe(true)
          });
    });

    describe('/restaurant/:restaurantId get', () => {
        it('should return 200 and restaurant', async () => {
            const restaurantResponse: IRestaurant = {  _id: 'testRestaurantId', name: 'namee', description: 'description' };

            const getOrdersSpy = jest.spyOn(RestaurantService.prototype, 'getRestaurant').mockImplementation((id) =>{ 
                return id === 'testRestaurantId' ? Promise.resolve(restaurantResponse) : Promise.resolve(null)
            } )

            const {body, statusCode} = await supertest(app).get('/api/v1/restaurant/testRestaurantId').expect(200);

            expect(getOrdersSpy).toHaveBeenCalledWith('testRestaurantId')
            expect(body).toEqual(restaurantResponse);
        });

        it('should return 404', async () => {
            const restaurantResponse: IRestaurant = {  _id: 'testRestaurantId', name: 'namee', description: 'description' };

            const getOrdersSpy = jest.spyOn(RestaurantService.prototype, 'getRestaurant').mockImplementation((id) =>{ 
                return id === 'testRestaurantId' ? Promise.resolve(restaurantResponse) : Promise.resolve(null)
            } )

            const {body, statusCode} = await supertest(app).get('/api/v1/restaurant/testRestaurantIdWrong').expect(404);

            expect(getOrdersSpy).toHaveBeenCalledWith('testRestaurantIdWrong')
            expect(body).toEqual({});
        });
    });

    describe('/restaurant/get/all', () => {
        it('should return 200 and restaurant', async () => {
            const restaurantResponse: IRestaurant[] = [
                {  _id: 'testRestaurantId', name: 'namee', description: 'description' },
                {  _id: 'testRestaurantIdTwo', name: 'namee', description: 'description' },
            ];

            const spy = jest.spyOn(RestaurantService.prototype, 'getAllRestaurants').mockImplementation(() =>{ 
                return Promise.resolve(restaurantResponse);
            } )

            const {body, statusCode} = await supertest(app).get('/api/v1/restaurant/get/all').expect(200);

            expect(body).toEqual(restaurantResponse);
        });
    });

    describe('/restaurant/:restaurantId put', () => {
        it('should return 200 and restaurant', async () => {
            const restaurantResponse: IRestaurant = {  _id: 'testRestaurantId', name: 'namee', description: 'description' };

            const spy = jest.spyOn(RestaurantService.prototype, 'setResturant').mockImplementation((restaurantResponse, id) =>{ 
                return id === 'testRestaurantId' ? Promise.resolve(restaurantResponse) : Promise.resolve(null)
            });

            const {body, statusCode} = await supertest(app).put('/api/v1/restaurant/testRestaurantId').send(restaurantResponse).expect(200);

            expect(spy).toHaveBeenCalledWith(restaurantResponse, 'testRestaurantId');
            expect(body).toEqual(restaurantResponse);
        });

        it('should return 404', async () => {
            const restaurantResponse: IRestaurant = {  _id: 'testRestaurantId', name: 'namee', description: 'description' };

            const spy = jest.spyOn(RestaurantService.prototype, 'setResturant').mockImplementation((restaurant, id) =>{ 
                return id === 'testRestaurantId' ? Promise.resolve(restaurant) : Promise.resolve(null)
            } )

            const {body, statusCode} = await supertest(app).put('/api/v1/restaurant/testRestaurantIdWrong').send(restaurantResponse).expect(404);

            expect(spy).toHaveBeenCalledWith(restaurantResponse, 'testRestaurantIdWrong');
            expect(body).toEqual({});
        });
    });

    describe('/restaurant post', () => {
        it('should return 200 and restaurant', async () => {
            const restaurantInput: IRestaurant = {  _id: '', name: 'namee', description: 'description' };

            const restaurantResponse: IRestaurant = {  _id: 'addedId', name: 'namee', description: 'description' };

            const spy = jest.spyOn(RestaurantService.prototype, 'setResturant').mockImplementation((restaurant) =>{ 

                let restaurantCopy = JSON.parse(JSON.stringify(restaurant));
                restaurantCopy._id = 'addedId'

                return Promise.resolve(restaurantCopy);
            });

            const {body, statusCode} = await supertest(app).post('/api/v1/restaurant').send(restaurantInput).expect(201);

            expect(spy).toHaveBeenCalledWith(restaurantInput);
            expect(body).toEqual(restaurantResponse);
        });
    });

    describe('/restaurant/:restaurantId delete', () => {
        it('should return 200', async () => {

            const getOrdersSpy = jest.spyOn(RestaurantService.prototype, 'deleteResturant').mockImplementation((id) =>{ 
                return id === 'testRestaurantId' ? Promise.resolve(true) : Promise.resolve(false)
            });

            const {body, statusCode} = await supertest(app).delete('/api/v1/restaurant/testRestaurantId').expect(200);

            expect(getOrdersSpy).toHaveBeenCalledWith('testRestaurantId');
        });

        it('should return 404', async () => {
            const getOrdersSpy = jest.spyOn(RestaurantService.prototype, 'deleteResturant').mockImplementation((id) =>{ 
                return id === 'testRestaurantId' ? Promise.resolve(true) : Promise.resolve(false)
            } )

            const {body, statusCode} = await supertest(app).delete('/api/v1/restaurant/testRestaurantIdWrong').expect(404);

            expect(getOrdersSpy).toHaveBeenCalledWith('testRestaurantIdWrong');
        });
    });

});