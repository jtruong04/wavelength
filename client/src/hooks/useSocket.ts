// These hook tells set the socket up and also joins a room.
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { GameEvents, SocketEvent } from 'enums';
import { UserID } from 'types';
import { MyIDAtom } from 'atoms/user';
import socket from 'services/socket';
import useStateMachine from './useStateMachine';

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
}

export default useSocket;
