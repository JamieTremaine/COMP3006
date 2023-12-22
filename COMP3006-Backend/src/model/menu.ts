import { Schema, model } from "mongoose";
import { IMenuItem, menuItemSchema } from "./menuItem";

export interface IMenu {
    _id: string;
    restaurantId: string
    restaurantName: string;
    MenuItems?: Array<IMenuItem>
}

const MenuSchema = new Schema<IMenu>({
    _id: String,
    restaurantId: String,
    restaurantName: String,
    MenuItems: menuItemSchema
});

export const MenuModel = model<IMenu>('menu', MenuSchema);