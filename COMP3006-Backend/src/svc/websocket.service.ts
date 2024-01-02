import { ConnectionModel, IConnection } from "../model/connections";
import { IStatus } from "../model/status";
import { IOrder, OrderModel } from "../model/order";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { Server } from "socket.io";
import { OrderService } from "./order.service";

export class WebsocketService {

    private io?: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;

    public setIo(io:Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) {
        this.io = io;
    }

    public addConnection(connection: IConnection) {
        ConnectionModel.create(connection);
    }

    public removeConnection(socketId: string) {
        ConnectionModel.deleteOne({socketId: socketId});
    }

    public async updateStatus(status: IStatus): Promise<Array<IConnection>> {
        let updatedOrder;

        if(status.status === 'delivered') {
            updatedOrder = await OrderModel.findByIdAndUpdate(status.orderId, { stage: status.status, active: false });
        } else {
            updatedOrder = await OrderModel.findByIdAndUpdate(status.orderId, { stage: status.status });
        }

        if(updatedOrder) {
            return await ConnectionModel.find({userId: updatedOrder!.userId});
        } else {
            return [];
        }
    }

    public sendOrder(order: IOrder, id: string) {
        if(this.io !== undefined) {
            ConnectionModel.find({userId: id}).then((connections) => {
                connections.forEach((connection)=>{
                    this.io!.to(connection.socketId).emit('new-order', order);
                })
            })  
        }
    }
}