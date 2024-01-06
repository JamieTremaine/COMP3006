import { IRestaurant, RestaurantModel } from "../../../model/restaurant";
import { RestaurantService } from "../../../svc/restaurant.service";


describe('restaurant service', () => {

    const restaurantService = new RestaurantService();

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });


    it('should get restaurant', async () => {
        const restaurant: IRestaurant = { _id: 'restaurantId', name: 'restaurantName', description: 'restaurantDescription'};
        
        RestaurantModel.findById = jest.fn().mockImplementation((id) => {
            return id === 'restaurantId' ? Promise.resolve(restaurant) : Promise.resolve(null)
        });

        let body = await restaurantService.getRestaurant('restaurantId');

        expect(body).toEqual(restaurant);

        body = await restaurantService.getRestaurant('restaurantIdWrong');

        expect(body).toEqual(null);
    });

    it('should get all restaurants', async () => {
        const restaurant: Array<IRestaurant> = [
            { _id: 'restaurantId', name: 'restaurantName', description: 'restaurantDescription'},
            { _id: 'restaurantIdTwo', name: 'restaurantName', description: 'restaurantDescription'}
        ];
        
        RestaurantModel.find = jest.fn().mockImplementation(() => {
            return Promise.resolve(restaurant);
        });

        let body = await restaurantService.getAllRestaurants();

        expect(body).toEqual(restaurant);
    });

    it('should get set restaurants', async () => {
        const restaurant: IRestaurant = { name: 'restaurantName', description: 'restaurantDescription'};

        const restaurantResponse: IRestaurant = { _id: 'addedId', name: 'restaurantName', description: 'restaurantDescription'};
        
        RestaurantModel.create = jest.fn().mockImplementation(() => {
            return Promise.resolve(restaurantResponse);
        });

        let body = await restaurantService.setResturant(restaurant);

        expect(body).toEqual(restaurantResponse);
    });

    it('should delete restaurant', async () => {
        const restaurantResponse: IRestaurant = { _id: 'addedId', name: 'restaurantName', description: 'restaurantDescription'};
        
        RestaurantModel.findByIdAndDelete = jest.fn().mockImplementation((id) => {
            return id === 'restaurantId' ? Promise.resolve({value: '1'}) : Promise.resolve({value: null})
        });

        let body = await restaurantService.deleteResturant('restaurantId');

        expect(body).toEqual(true);
    });
});