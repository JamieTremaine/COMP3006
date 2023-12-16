import { Schema, model } from "mongoose";

export interface IMenuItem {
    _id?: string;
    name: string;
    type: string;
    price: number;
    decription: string;
    allegens: Array<string>;
    extras: Array<string>;
}

const MenuItemSchema =  new Schema<IMenuItem>({
    _id: String,
    name: String,
    type: String,
    price: Number,
    decription: String,
    allegens: Array<String>
});

export const MenuItem = model<IMenuItem>('menu_item', MenuItemSchema);
