import { Schema, model } from "mongoose";

export interface IConnection {
    socketId: string;
    userId: string;
}

const connectionSchema = new Schema<IConnection>({
    socketId: String,
    userId: String
});

export const ConnectionModel = model<IConnection>('connections', connectionSchema);