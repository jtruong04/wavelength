// These hook tells set the socket up and also joins a room.
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { SocketEvent } from 'enums';
import { UserID } from 'types';
import { MyIDAtom } from 'atoms/user';
import socket from 'services/socket';

function useSocket() {
    // Connect to server
    const setUserID = useSetRecoilState(MyIDAtom);
    useEffect(() => {
        socket.once(SocketEvent.ESTABLISH_CONNECTION, (id: UserID) => {
            setUserID(id);
        });
    }, [setUserID]);
}

export default useSocket;
