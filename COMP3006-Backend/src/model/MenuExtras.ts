import { Schema } from "mongoose";
import { INutritionalInfo, nutritionalInfoSchema } from "./nutritionalInfo";

export interface IMenuExtras {
    required?: boolean,
    minimumRequired?: number
    max?: number,
    name: string,
    extras: Array<{
        name: string, 
        NutritionalInfo: INutritionalInfo
    }>;
}

export const menuExtraSchema = new Schema<IMenuExtras>({
    required: Boolean,
    minimumRequired: { type: Number, required: false },
    max: { type: Number, required: false },
    name: String,
    extras: [{name: String, NutritionalInfo: nutritionalInfoSchema}]
});