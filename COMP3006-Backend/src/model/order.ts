import { Schema, model } from "mongoose";
import { IMenuItem } from "./menuItem";
import { IRestaurant, Restaurant } from "./restaurant";

export interface IOrder {
    _id?: string;
    userId: string;
    restaurant: IRestaurant
    items: Array<IMenuItem>;
    total: number;
    orderTime: Date
    specialInstructions: string;
}


const orderSchema =  new Schema<IOrder>({
    _id: String,
    userId: String,
    restaurant: Restaurant,
    items: Array<IMenuItem>,
    total: Number,
    orderTime: Date
});

export const OrderModel = model<IOrder>('order', orderSchema);