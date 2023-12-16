import { Schema, model } from "mongoose";

export interface IRestaurant {
    _id?: string
    restaurantName: string;
    currentMenuId?: string;
}

export class Restaurant implements IRestaurant{
    constructor(public restaurantName: string, public _id?: string,  public currentMenuId?: string) {}
}

const restaurantSchema = new Schema<IRestaurant>({
    _id: String,
    restaurantName: String,
    currentMenuId: String
});

export const RestaurantModel = model<IRestaurant>('restaurant', restaurantSchema);