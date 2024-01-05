import { createServer } from "node:http";
import { type AddressInfo } from "node:net";
import { io as ioc, type Socket as ClientSocket } from "socket.io-client";
import { Server, type Socket as ServerSocket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import websocketController from "../../../src/controllers/websocket.controller";
import { WebsocketService } from "../../../src/svc/websocket.service";

describe('websocket controller', ()=> {
    let io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    let serverSocket: ServerSocket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
    let clientSocket: ClientSocket<DefaultEventsMap, DefaultEventsMap>;

    beforeAll((done) => {
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
        io.close();
        clientSocket.disconnect();
    });

    it("should work", (done) => {
    clientSocket.on("hello", (arg) => {
        expect(arg).toBe("world");
        done();
    });
    serverSocket.emit("hello", "world");
    });

    it('should manage connection-details', (done) => {
        const spy = jest.spyOn(WebsocketService.prototype, 'addConnection').mockImplementation(() =>{});

        serverSocket.on('connection-details', () =>{
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
      
        clientSocket.emit('connection-details', { test: 'test' })
    });
    
    it('should manage status-change', (done) => {
        const spy = jest.spyOn(WebsocketService.prototype, 'updateStatus').mockImplementation(() =>{
            return Promise.resolve([]);
        });

        serverSocket.on('status-change', () =>{
            expect(spy).toHaveBeenCalledTimes(1);
            done();
        });
      
        clientSocket.emit('status-change', { status: 'test', orderId: 'orderId' });
    });
});
