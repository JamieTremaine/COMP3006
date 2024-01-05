import { Schema, model } from "mongoose";

export interface IUserLogin {
    _id?: string
    username: string;
    password: string;
    salt?: string;
}

export const userLoginSchema = new Schema<IUserLogin>({
    username: String,
    password: String,
    salt: String,
});

export const UserLoginModel = model<IUserLogin>('user_logins', userLoginSchema);