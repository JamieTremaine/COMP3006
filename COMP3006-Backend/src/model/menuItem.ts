import { Schema, model } from "mongoose";

export interface IMenuItem {
    name: string;
    type: string;
    price: number;
    decription: string;
    allegens: Array<string>;
    extras: Array<string>;
}
