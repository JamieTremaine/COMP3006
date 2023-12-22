import { Schema } from "mongoose";

export interface IAddress {
    addresslineOne: string;
    addressLineTwo: string;
    postcode: string;
}

export const addressSchema = new Schema<IAddress>({
    addresslineOne: String,
    addressLineTwo: String,
    postcode: String
});