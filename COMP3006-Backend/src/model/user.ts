import { Schema, model } from "mongoose";
import { IAddress } from "./address";

export interface IUser {
    _id?: string
    userName: string;
    addresses: Array<IAddress>;
}

const userSchema = new Schema<IUser>({
    _id: String,
    userName: String,
    addresses: Array<IAddress>
});

export const UserModel = model<IUser>('user', userSchema);