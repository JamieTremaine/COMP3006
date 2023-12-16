import { Schema, model } from "mongoose";
import { IMenuItem } from "./menuItem";

export interface IOrder {
    _id?: string;
    items: Array<IMenuItem>;
    total: number;
}


const orderSchema =  new Schema<IOrder>({
    _id: String,
    items: Array<IMenuItem>,
    total: Number,
});

export const Order = model<IOrder>('order', orderSchema);