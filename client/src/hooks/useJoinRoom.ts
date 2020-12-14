// These hook tells set the socket up and also joins a room.
import { useEffect } from 'react';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';

import { SocketEvent } from 'enums';
import { UserID, User } from 'types';
import { PlayerListState, PlayerState, UserIDState } from 'atoms/user';
import { RoomState } from 'atoms/room';
import socket from 'services/socket';

function useJoinRoom() {
    const room = useRecoilValue(RoomState);
    const userid = useRecoilValue(UserIDState);
    const setPlayerList = useSetRecoilState(PlayerListState);

    const getPlayer = useRecoilCallback(
        ({ snapshot }) => async (userid: UserID) =>
            await snapshot.getPromise(PlayerState(userid))
    );

    useEffect(() => {
        socket.emit(SocketEvent.JOIN_ROOM, { room, userid });
        return () => {
            socket.emit(SocketEvent.LEAVE_ROOM);
            socket.removeAllListeners();
        };
    }, [room, userid]);

    // useEffect(() => {
    //     // console.log('I have changed', me);
    //     socket.emit(SocketEvent.UPDATE_PLAYER, { userid, userData: me });
    // }, [me, userid]);

    const setPlayer = useRecoilCallback(
        ({ set }) => (playerid: UserID, playerdata: User) => {
            set(PlayerState(playerid), playerdata);
        }
    );
    useEffect(() => {
        socket.on(SocketEvent.UPDATE_LIST, (playerList: string[]) => {
            setPlayerList(playerList);
        });
        return () => {
            socket.off(SocketEvent.UPDATE_LIST);
        };
    }, [setPlayerList]);

    useEffect(() => {
        socket.on(SocketEvent.REQUEST_PLAYERS, async () => {
            const userData = await getPlayer(userid);
            socket.emit(SocketEvent.UPDATE_PLAYER, {
                userid,
                userData,
            });
        });
        socket.on(
            SocketEvent.UPDATE_PLAYER,
            (payload: { userid: UserID; userData: User }) => {
                setPlayer(payload.userid, payload.userData);
            }
        );
        return () => {
            socket.off(SocketEvent.REQUEST_PLAYERS);
            socket.off(SocketEvent.UPDATE_PLAYER);
        };
    }, [setPlayer, userid, getPlayer]);
}

export default useJoinRoom;
