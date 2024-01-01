import { Schema } from "mongoose";

export interface IStatus {
    status: string;
    orderId: string;
}

const statusSchema = new Schema<IStatus>({
    status: String,
    orderId: String
});

//I want to create a schema for the openapi spec but dont *actually* want a collection for this
export const StatusModel = { schema: statusSchema };