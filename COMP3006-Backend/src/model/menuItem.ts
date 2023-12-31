import { Schema } from "mongoose";
import { INutritionalInfo, nutritionalInfoSchema } from "./nutritionalInfo";
import { IMenuExtras, menuExtraSchema } from "./MenuExtras";

export interface IMenuItem {
    _id: string,
    name: string,
    itemTypes: Array<string>,
    description: string,
    price: number,
    allegens: Array<string>
    nutritionalInfo: INutritionalInfo,
    extras: Array<IMenuExtras>
}

export const menuItemSchema = new Schema<IMenuItem>({
    name: String,
    itemTypes:  [String],
    description: String,
    price: Number,
    allegens: [String],
    nutritionalInfo: nutritionalInfoSchema,
    extras: [menuExtraSchema]
});
