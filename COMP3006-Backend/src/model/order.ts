import { Schema, model } from "mongoose";
import { IMenuItem, menuItemSchema } from "./menuItem";
import { IRestaurant, Restaurant, restaurantSchema } from "./restaurant";

export interface IOrder {
    _id?: string;
    userId: string;
    restaurant: IRestaurant
    items?: Array<IMenuItem>;
    total: number;
    orderTime: Date
    specialInstructions: string;
}


const orderSchema = new Schema<IOrder>({
    _id: String,
    userId: String,
    restaurant: restaurantSchema,
    items: [menuItemSchema],
    total: Number,
    orderTime: Date
});

export const OrderModel = model<IOrder>('orders', orderSchema);