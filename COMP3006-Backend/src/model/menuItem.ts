import { Schema, model } from "mongoose";

export interface IMenuItem {
    name: string;
    type: Array<string>;
    price: number;
    decription: string;
    allegens: Array<string>;
    extras: Array<string>;
}

export const menuItemSchema = new Schema<IMenuItem>({
    name: String,
    type:  [String],
    price: Number,
    decription: String,
    allegens: [String],
    extras:  [String]
});
