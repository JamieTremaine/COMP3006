import { Schema } from "mongoose";
import { INutritionalInfo, nutritionalInfoSchema } from "./nutritionalInfo";
import { IMenuExtras, menuExtraSchema } from "./MenuExtras";

export interface IMenuItem {
    _id: string,
    name: String,
    itemTypes: Array<string>,
    image: Buffer | null,
    description: string,
    price: number,
    allegens: Array<string>
    nutritionalInfo: INutritionalInfo,
    extras: Array<IMenuExtras>
}

export const menuItemSchema = new Schema<IMenuItem>({
    name: String,
    itemTypes:  [String],
    image: Buffer,
    description: String,
    price: Number,
    allegens: [String],
    nutritionalInfo: nutritionalInfoSchema,
    extras: [menuExtraSchema]
});
