import { Schema, model } from "mongoose";
import { IAddress, addressSchema } from "./address";

export interface ICreateUser {
    username: string;
    password: string;
    addresses?: Array<IAddress>;
    type: string
}

const createUserSchema = new Schema<ICreateUser>({
    username: String,
    password: String,
    addresses: [addressSchema],
    type: String
});

//I want to create a schema for the openapi spec but dont *actually* want a collection for this
export const CreateUserModel = { schema: createUserSchema };