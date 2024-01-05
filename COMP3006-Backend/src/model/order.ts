import { Schema, model } from "mongoose";
import { IMenuItem, menuItemSchema } from "./menuItem";
import { IRestaurant, restaurantSchema } from "./restaurant";
import { IAddress, addressSchema } from "./address";

export interface IOrder {
    _id?: string;
    userId: string;
    restaurant: IRestaurant
    items?: Array<IMenuItem>;
    total: number;
    active: boolean;
    address: IAddress;
    stage: string;
}


const orderSchema = new Schema<IOrder>({
    userId: String,
    restaurant: restaurantSchema,
    items: [menuItemSchema],
    total: Number,
    active: Boolean,
    address: addressSchema,
    stage: String
});

export const OrderModel = model<IOrder>('orders', orderSchema);