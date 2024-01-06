import { createServer } from "http";
import { Server } from "socket.io";
import { IConnection, ConnectionModel } from "../../../model/connections";
import { IOrder, OrderModel } from "../../../model/order";
import { IStatus } from "../../../model/status";
import { WebsocketService } from "../../../svc/websocket.service";


describe('websocket service', () => {

    const websocketService = new WebsocketService();

    afterAll(() => {
        jest.resetModules();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should setIo', () => {
        const server = createServer();
        const io = new Server(server);

        expect(websocketService['io']).toBeUndefined();
        websocketService.setIo(io);
        expect(websocketService['io']).toBe(io);
    });

    it('should add connection', async () => {
        const connection: IConnection = {socketId: 'socket', userId: 'userIdTest'};

        const mock = jest.fn().mockImplementation((user) => {
            return Promise.resolve(null)
        });

        ConnectionModel.create = mock;

        await websocketService.addConnection(connection);
        expect(mock).toHaveBeenCalledWith(connection);
    });

    it('should remove connection', async () => {
        const connection: IConnection = {socketId: 'socket', userId: 'userIdTest'};

        const mock = jest.fn().mockImplementation((user) => {
            return Promise.resolve(null)
        });

        ConnectionModel.deleteOne = mock;

        await websocketService.removeConnection('socket');
        expect(mock).toHaveBeenCalledWith({socketId: 'socket'});
    });

    it('should update status', async () => {
        const status: IStatus = {status: 'statusToChange', orderId: 'orderIdTest'};

        const updatedOrder: IOrder = {
            _id: 'orderIdTest', 
            userId: 'userId', 
            restaurant: {
                name: 'restaurantName', description: 'restaurantDescription'
            }, 
            total: 1,
            active: false,
            stage: 'on the way',
            address: {
                addresslineOne: 'one',
                postcode: 'post'
            }
        }

        const connections: Array<IConnection> = [
            { socketId: 'socket', userId: 'userIdTest' },
            { socketId: 'socketTwo', userId: 'userIdTest' }
        ];

        const mock = jest.fn().mockImplementation(() => {
            return Promise.resolve(updatedOrder)
        });

        OrderModel.findByIdAndUpdate = mock;

        ConnectionModel.find =  jest.fn().mockImplementation(() => {
            return Promise.resolve(connections)
        });

        const body = await websocketService.updateStatus(status);
        expect(mock).toHaveBeenCalledWith('orderIdTest', {stage: 'statusToChange'});

        expect(body).toEqual(connections);
    });

    it('should set active to false when delivered', async () => {
        const status: IStatus = {status: 'delivered', orderId: 'orderIdTest'};

        const updatedOrder: IOrder = {
            _id: 'orderIdTest', 
            userId: 'userId', 
            restaurant: {
                name: 'restaurantName', description: 'restaurantDescription'
            }, 
            total: 1,
            active: true,
            stage: 'delivered',
            address: {
                addresslineOne: 'one',
                postcode: 'post'
            }
        }

        const connections: Array<IConnection> = [
            { socketId: 'socket', userId: 'userIdTest' },
            { socketId: 'socketTwo', userId: 'userIdTest' }
        ];

        const mock = jest.fn().mockImplementation(() => {
            return Promise.resolve(updatedOrder)
        });

        OrderModel.findByIdAndUpdate = mock;

        ConnectionModel.find =  jest.fn().mockImplementation(() => {
            return Promise.resolve(connections)
        });

        const body = await websocketService.updateStatus(status);
        expect(mock).toHaveBeenCalledWith('orderIdTest', {stage: 'delivered', active: false });

        expect(body).toEqual(connections);
    });
});