import { Server, Socket } from 'socket.io';
import { roomManager } from './services';

import { RoomID } from './types';
import { SocketEvent } from './enums';

export default (server: Express.Application) => {
    const io = new Server(server);
    io.on(SocketEvent.CONNECT, (socket: Socket) => {
        // Respond to client confirming connection
        socket.emit(SocketEvent.ESTABLISH_CONNECTION, socket.id);
        // When client disconnects, tell everyone else in room they left
        socket.on(SocketEvent.DISCONNECT, () => {
            const room = roomManager.getPlayersRoom(socket.id);
            socket
                .to(room)
                .emit(SocketEvent.PLAYER_LEAVE, { playerid: socket.id });
        });
        // When client connects
        socket.on(
            SocketEvent.JOIN_ROOM,
            (payload: { room: RoomID; userid: string }, ack) => {
                const { room, userid } = payload;
                socket.join(room);
                roomManager.addPlayerToRoom(room, userid);
                if (ack) ack();
            }
        );
        socket.on(SocketEvent.REQUEST, (key, ack) => {
            const room = roomManager.getPlayersRoom(socket.id);
            const val = roomManager.readData(room, key);
            ack(val);
        });
        socket.onAny((event, payload, ack) => {
            if (socket.eventNames().includes(event)) {
                return;
            }
            const room = roomManager.getPlayersRoom(socket.id);
            roomManager.saveData(room, event, payload);
            socket.to(room).emit(event, payload);
            if (ack) ack();
        });
    });
};
