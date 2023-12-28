import { Schema, model } from "mongoose";

export interface IRestaurant {
    _id?: string
    name: string;
    description: string;
    currentMenuId?: string;
    restaurantType?: Array<string>;
}

export class Restaurant implements IRestaurant{
    constructor(public name: string, public restaurantType: Array<string>, public description: string, public _id?: string,  public currentMenuId?: string) {}
}

export const restaurantSchema = new Schema<IRestaurant>({
    description: String,
    name: String,
    restaurantType: [String],
    currentMenuId: String
});

export const RestaurantModel = model<IRestaurant>('restaurants', restaurantSchema);