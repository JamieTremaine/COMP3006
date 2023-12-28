import { Schema, model } from "mongoose";
import { IAddress, addressSchema } from "./address";

export interface IUser {
    _id?: string
    userName: string;
    addresses?: Array<IAddress>;
}

const userSchema = new Schema<IUser>({
    _id: String,
    userName: String,
    addresses: [addressSchema]
});

export const UserModel = model<IUser>('users', userSchema);