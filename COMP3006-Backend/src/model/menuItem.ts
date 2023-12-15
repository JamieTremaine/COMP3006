import { Schema, model } from "mongoose";
import { NutritionalInfo } from "./nutritionalInfo";

export interface IMenuItem {
    name?: string;
    type?: string;
    price?: number;
    decription?: string;
    nutritionalInfo?: NutritionalInfo;
    allegens?: Array<string>;
}

const MenuItemSchema =  new Schema<IMenuItem>({
    name: String,
    type: String,
    price: Number,
    decription: String,
    nutritionalInfo: NutritionalInfo,
    allegens: Array<String>
});

export const MenuItem = model<IMenuItem>('Menu', MenuItemSchema);
