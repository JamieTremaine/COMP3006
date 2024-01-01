import { Schema, model } from "mongoose";
import { IAddress, addressSchema } from "./address";

export interface IUser {
    _id?: string
    username: string;
    type: string;
    addresses?: Array<IAddress>;
    restaurantId?: string;
}

export const userSchema = new Schema<IUser>({
    username: String,
    type: String,
    addresses: [addressSchema],
    restaurantId: { type: String, required: false }
});

export const UserModel = model<IUser>('users', userSchema);