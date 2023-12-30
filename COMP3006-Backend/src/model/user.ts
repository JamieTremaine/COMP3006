import { Schema, model } from "mongoose";
import { IAddress, addressSchema } from "./address";

export interface IUser {
    _id?: string
    username: string;
    type: string;
    addresses?: Array<IAddress>;
}

export const userSchema = new Schema<IUser>({
    username: String,
    type: String,
    addresses: [addressSchema]
});

export const UserModel = model<IUser>('users', userSchema);