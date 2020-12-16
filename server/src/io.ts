import wildcard from 'socketio-wildcard';

import { Server, Socket } from 'socket.io';
import { roomManager } from './services';

import { IMessage, RoomID, User, UserID } from './types';
import { SocketEvent, ChatEvent, GameEvents } from './enums';

export default (server: Express.Application) => {
    const io = new Server(server);
    // io.use(wildcard() as any);
    io.on(SocketEvent.CONNECT, (socket: Socket) => {
        socket.on(SocketEvent.ESTABLISH_CONNECTION, () => {
            socket.emit(SocketEvent.ESTABLISH_CONNECTION, socket.id);
        });
        socket.on(SocketEvent.DISCONNECT, () => {
            const room = roomManager.getPlayersRoom(socket.id);
            roomManager.removePlayerFromRoom(room, socket.id);
            io.in(room).emit(
                SocketEvent.UPDATE_LIST,
                roomManager.getPlayerList(room)
            );
        });
        socket.on(
            SocketEvent.JOIN_ROOM,
            (payload: { user: User; userid: UserID; room: RoomID }) => {
                socket.join(payload.room);
                roomManager.addPlayerToRoom(payload.room, payload.userid);
                io.in(payload.room).emit(
                    SocketEvent.UPDATE_LIST,
                    roomManager.getPlayerList(payload.room)
                );
                // socket.to(payload.room).emit(SocketEvent.UPDATE_PLAYER, {
                //     userid: payload.userid,
                //     userData: payload.user,
                // });
                io.in(payload.room).emit(SocketEvent.REQUEST_PLAYERS);
            }
        );
        socket.on(SocketEvent.REQUEST_PLAYERS, () => {
            const room = roomManager.getPlayersRoom(socket.id);
            socket.to(room).emit(SocketEvent.REQUEST_PLAYERS);
        });
        socket.on(
            SocketEvent.UPDATE_PLAYER,
            (payload: {
                // requester: UserID;
                userid: UserID;
                userData: User;
            }) => {
                const room = roomManager.getPlayersRoom(socket.id);
                socket.to(room).emit(SocketEvent.UPDATE_PLAYER, {
                    userid: payload.userid,
                    userData: payload.userData,
                });
            }
        );
        socket.on(SocketEvent.LEAVE_ROOM, () => {
            const room = roomManager.getPlayersRoom(socket.id);
            socket.leave(room);
            roomManager.removePlayerFromRoom(room, socket.id);
            io.in(room).emit(
                SocketEvent.UPDATE_LIST,
                roomManager.getPlayerList(room)
            );
        });
        // Chat Event
        socket.on(ChatEvent.MESSAGE, (payload: IMessage) => {
            io.in(roomManager.getPlayersRoom(socket.id)).emit(
                ChatEvent.MESSAGE,
                payload
            );
        });

        // Game Events
        Object.values(GameEvents).forEach((event) => {
            socket.on(event, (payload: any) => {
                socket
                    .to(roomManager.getPlayersRoom(socket.id))
                    .emit(event, payload);
            });
        });
    });
};
