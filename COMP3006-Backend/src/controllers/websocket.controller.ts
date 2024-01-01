import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

let sockets: Map<string, string> = new Map();

export default (io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>) => {

    io.on('connection', (socket) => {
        socket.on('disconnect', () => {
           sockets.delete(socket.id);
        });
    
        socket.on('connection-details', (userId) => {
            sockets.set(userId, socket.id);
        });
    });
}

