import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import { WebsocketService } from "../svc/websocket.service";
import { IStatus } from "../model/status";

const websocketService = WebsocketService.getService();

export default (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {

    websocketService.setIo(io);

    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
            websocketService.removeConnection(socket.id);  
        });
    
        socket.on('connection-details', (userId) => {
            websocketService.addConnection({socketId: socket.id, userId: userId});
        });

        socket.on('status-change', (status: IStatus) => {
            websocketService.updateStatus(status).then((connectionsToInform) => {
                connectionsToInform.forEach((connection)=> {
                    io.to(connection.socketId).emit('status-change', status.status);
                });
            })
        })
    });

}

