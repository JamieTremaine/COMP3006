import { Schema, model } from "mongoose";

export interface IConnection {
    socketId: string;
    userId: string;
}

const ConnectionSchema = new Schema<IConnection>({
    socketId: String,
    userId: String
});

export const ConnectionModel = model<IConnection>('connections', ConnectionSchema);