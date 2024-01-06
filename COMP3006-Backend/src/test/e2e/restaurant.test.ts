import supertest from "supertest";
import { app } from "../../server";
import { RestaurantModel } from "../../model/restaurant";

describe('restaurant e2e', () => {

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should get restaurant', async () =>{
        const restaurant = {
            "_id": "659845831000f466ee24ca19",
            "description": "Guaranteed speed without a clown in sight",
            "name": "McRonalds",
            "restaurantType": [
              "american",
              "burger",
              "chicken"
            ],
            "__v": 0,
            "currentMenuId": "659845831000f466ee24ca23"
          }

        RestaurantModel.findById = jest.fn().mockImplementation((id) => {
            return id === '659845831000f466ee24ca19' ? Promise.resolve(restaurant) : Promise.resolve(null);
        });

        const { body } = await supertest(app).get('/api/v1/restaurant/659845831000f466ee24ca19').expect(200);

        expect(body).toEqual(restaurant);
    });

    it('should get all restaurants', async () =>{
        const restaurants = [{
            "_id": "659845831000f466ee24ca19",
            "description": "Guaranteed speed without a clown in sight",
            "name": "McRonalds",
            "restaurantType": [
              "american",
              "burger",
              "chicken"
            ],
            "__v": 0,
            "currentMenuId": "659845831000f466ee24ca23"
          },
          {
            "_id": "659845831000f466ee24ca1f",
            "description": "Only 15 of us in the city!",
            "name": "Totally Original Charcoal Grill",
            "restaurantType": [
              "bbq",
              "burger",
              "chicken"
            ],
            "__v": 0,
            "currentMenuId": "659845831000f466ee24ca94"
          }
        ]

        RestaurantModel.find = jest.fn().mockImplementation(() => {
            return  Promise.resolve(restaurants);
        });

        const { body } = await supertest(app).get('/api/v1/restaurant/get/all').expect(200);

        expect(body).toEqual(restaurants);
    });

    it('should update a restaurant', async () => {
        const restaurant = {
            "_id": "659845831000f466ee24ca19",
            "description": "Guaranteed speed without a clown in sight",
            "name": "McRonalds",
            "restaurantType": [
              "american",
              "burger",
              "chicken"
            ],
            "__v": 0,
            "currentMenuId": "659845831000f466ee24ca23"
          }

        const mock = jest.fn().mockImplementation(() => {
            return Promise.resolve(restaurant);
        });

        RestaurantModel.findByIdAndUpdate = mock;

        const { body } = await supertest(app).put('/api/v1/restaurant/659845831000f466ee24ca19').send(restaurant).expect(200);

        expect(body).toEqual(restaurant);

        expect(mock).toHaveBeenCalledWith('659845831000f466ee24ca19', restaurant);
    });

    it('should add a restaurant', async () => {
        const restaurant = {
            "_id": "",
            "description": "Guaranteed speed without a clown in sight",
            "name": "McRonalds",
            "restaurantType": [
              "american",
              "burger",
              "chicken"
            ],
            "__v": 0,
            "currentMenuId": "659845831000f466ee24ca23"
          }

          const restaurantResult = {
            "_id": "659845831000f466ee24ca19",
            "description": "Guaranteed speed without a clown in sight",
            "name": "McRonalds",
            "restaurantType": [
              "american",
              "burger",
              "chicken"
            ],
            "__v": 0,
            "currentMenuId": "659845831000f466ee24ca23"
          }

          const mock = jest.fn().mockImplementation(() => {
            return Promise.resolve(restaurantResult);
        });

        RestaurantModel.create = mock
        const { body } = await supertest(app).post('/api/v1/restaurant/').send(restaurant).expect(201);

        expect(body).toEqual(restaurantResult);
        expect(mock).toHaveBeenCalledWith(restaurant);
    });

    it('should delete a restaurant', async () => {
        const restaurant = {
            "_id": "659845831000f466ee24ca19",
            "description": "Guaranteed speed without a clown in sight",
            "name": "McRonalds",
            "restaurantType": [
              "american",
              "burger",
              "chicken"
            ],
            "__v": 0,
            "currentMenuId": "659845831000f466ee24ca23"
          }

        RestaurantModel.findByIdAndDelete = jest.fn().mockImplementation((id) => {
            return id === '6538a5dc1200a426ee24cb4d' ? Promise.resolve(restaurant) : Promise.resolve(null);
        });

        const { body } = await supertest(app).delete('/api/v1/restaurant/6538a5dc1200a426ee24cb4d').send(restaurant).expect(204);
    });
});

