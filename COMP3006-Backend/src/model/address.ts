import { Schema } from "mongoose";

export interface IAddress {
    addresslineOne: string;
    addresslineTwo: string;
    postcode: string;
}

export const addressSchema = new Schema<IAddress>({
    addresslineOne: String,
    addresslineTwo: String,
    postcode: String
});

export const AddressModel = { schema: addressSchema };