import { Schema } from "mongoose";

export interface INutritionalInfo {
    calories: number
}

export const nutritionalInfoSchema = new Schema<INutritionalInfo>({
    calories: Number,
});
