import { Schema, model } from "mongoose";

export interface IMenuItem {
    name: string;
    type: Array<string>;
    price: number;
    decription: string;
    allegens: Array<string>;
    extras: Array<string>;
}
