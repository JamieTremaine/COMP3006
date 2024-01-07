import { createServer } from "node:http";
import { type AddressInfo } from "node:net";
import { Server, type Socket as ServerSocket } from "socket.io";
import { io as ioc, type Socket as ClientSocket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import websocketController from "../../controllers/websocket.controller";
import { ConnectionModel } from "../../model/connections";
import { OrderModel } from "../../model/order";
import { getOrder } from "./util/order.util";

describe('websocket e2e', () => {
    let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    let serverSocket: ServerSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    let clientSocket: ClientSocket<DefaultEventsMap, DefaultEventsMap>;
    
    beforeEach((done) => {
        const httpServer = createServer();
        io = new Server(httpServer);
        httpServer.listen(() => {
            const port = (httpServer.address() as AddressInfo).port;
            websocketController(io);
            clientSocket = ioc(`http://localhost:${port}`);
            io.on("connection", (socket) => {
                serverSocket = socket;
            });
            clientSocket.on("connect", done);
        });
      });

    afterAll(() => {   
        jest.resetModules();
        jest.restoreAllMocks();
    });

    afterEach(() => {
        io.close();
        clientSocket.disconnect();

        jest.clearAllMocks();
    });

    it('should remove connection on disconnect', (done) => {
        const connectionResult = {
            _id: '659845831000f466ee24caa5',
            socketId: 'iuYjtv2I2ocByzCtAAAB',
            userID: 'a29845831003f266ee24cac7',
            __v: 0
        };

       
        const mock = jest.fn().mockImplementation(() => {
            return Promise.resolve(connectionResult);
        });

        ConnectionModel.deleteOne = mock

        serverSocket.on('disconnect', () =>{
            expect(mock).toHaveBeenCalledWith({socketId: serverSocket.id});
            done();
        });

        clientSocket.disconnect();
    });

    it('should add connection on connection-details message', (done) => {
        const connectionResult = {
            _id: '659845831000f466ee24caa5',
            socketId: 'iuYjtv2I2ocByzCtAAAB',
            userID: 'a29845831003f266ee24cac7',
            __v: 0
        };
       
        const mock = jest.fn().mockImplementation(() => {
            return Promise.resolve(connectionResult);
        });

        ConnectionModel.create = mock

        serverSocket.on('connection-details', () =>{
            expect(mock).toHaveBeenCalledWith({socketId: serverSocket.id, userId:'a29845831003f266ee24cac7'});
            done();
        });

        clientSocket.emit('connection-details', 'a29845831003f266ee24cac7');
    });

    it('should change status and emit to any relevent clients', (done) => {
       const order = getOrder();

       const connectionResult = [{
            _id: '659845831000f466ee24caa5',
            socketId: clientSocket.id,
            userID: 'a29845831003f266ee24cac7',
            __v: 0
        }];
       
        const mock = jest.fn().mockImplementation(() => {
            return Promise.resolve(order);
        });

        OrderModel.findByIdAndUpdate = mock

        ConnectionModel.find = jest.fn().mockImplementation(() => {
            return Promise.resolve(connectionResult);
        });

        clientSocket.on('status-change', (newStatus)=> {
            expect(mock).toHaveBeenCalledWith(order._id, { stage: 'on the way' });
            expect(newStatus).toEqual('on the way');
            done();
        })

        clientSocket.emit('status-change', {status: 'on the way', orderId: order._id});
    });
});