// These hook tells set the socket up and also joins a room.
import { useEffect } from 'react';
import { useRecoilCallback, useSetRecoilState } from 'recoil';
import { GameEvents, SocketEvent } from 'enums';
import { UserID } from 'types';
import { MyIDAtom, PlayerListAtom } from 'atoms/user';
import socket from 'services/socket';
import useStateMachine from './useStateMachine';
import { RosterAtom, TeamOrderingAtom } from 'atoms/team';

function useSocket() {
    // Connect to server
    const setUserID = useSetRecoilState(MyIDAtom);
    useEffect(() => {
        socket.once(SocketEvent.ESTABLISH_CONNECTION, (id: UserID) => {
            setUserID(id);
        });
    }, [setUserID]);
    // // Listen to next state event
    const goToNextState = useStateMachine();
    useEffect(() => {
        socket.on(GameEvents.NEXT, (options: any) => {
            goToNextState(options, true);
        });
        return () => {
            socket.off(GameEvents.NEXT);
        };
    }, [goToNextState]);
    const removePlayer = useRecoilCallback(
        ({ set, snapshot }) => async (playerid: UserID) => {
            set(PlayerListAtom, (current) =>
                current.filter((player) => player !== playerid)
            );
            const teamsList = await snapshot.getPromise(TeamOrderingAtom);
            teamsList.forEach((teamid) => {
                set(RosterAtom(teamid), (current) =>
                    current.filter((player) => player !== playerid)
                );
            });
        }
    );
    useEffect(() => {
        socket.on(SocketEvent.PLAYER_LEAVE, (playerid: UserID) =>
            removePlayer(playerid)
        );
        return () => {
            socket.off(SocketEvent.PLAYER_LEAVE);
        };
    }, [removePlayer]);
}

export default useSocket;
