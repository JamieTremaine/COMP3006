import { Schema, model } from "mongoose";

export interface IRestaurant {
    _id?: string
    restaurantName: string;
    currentMenuId?: string;
    restaurantType: string;
}

export class Restaurant implements IRestaurant{
    constructor(public restaurantName: string, public restaurantType: string, public _id?: string,  public currentMenuId?: string) {}
}

const restaurantSchema = new Schema<IRestaurant>({
    _id: String,
    restaurantName: String,
    restaurantType: String,
    currentMenuId: String
});

export const RestaurantModel = model<IRestaurant>('restaurant', restaurantSchema);