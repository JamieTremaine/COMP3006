import { Schema, model } from "mongoose";

export interface IRestaurant {
    _id?: string
    restaurantName: string;
    resturantDescription: string;
    currentMenuId?: string;
    restaurantType: Array<string>;
}

export class Restaurant implements IRestaurant{
    constructor(public restaurantName: string, public restaurantType: Array<string>, public resturantDescription: string, public _id?: string,  public currentMenuId?: string) {}
}

const restaurantSchema = new Schema<IRestaurant>({
    _id: String,
    resturantDescription: String,
    restaurantName: String,
    restaurantType: Array<String>,
    currentMenuId: String
});

export const RestaurantModel = model<IRestaurant>('restaurant', restaurantSchema);