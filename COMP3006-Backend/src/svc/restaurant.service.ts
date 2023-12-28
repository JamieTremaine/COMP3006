import {  IRestaurant, RestaurantModel,  } from "../model/restaurant";

export class RestaurantService {

    public async getRestaurant(resurantId: string): Promise<IRestaurant | null> {
        try {
            const result = await RestaurantModel.findById(resurantId);
            return result;
        }
        catch {
            return null;
        }
    }

    public async getAllRestaurants(): Promise<Array<IRestaurant>> {
        return await RestaurantModel.find();
    }

    public async setResturant(restaurant: IRestaurant, resturantId?: string): Promise<IRestaurant | null> {
        let restaurantResult: IRestaurant | null;

        if (resturantId) {
            restaurantResult = await RestaurantModel.findByIdAndUpdate(resturantId, restaurant)
        } else {
            restaurantResult = await RestaurantModel.create(restaurant);
        }

        return restaurantResult;
    }

    public async deleteResturant(resturantId: string): Promise<boolean> {
        const result = await RestaurantModel.findByIdAndDelete(resturantId);
        return !!result
    }
}