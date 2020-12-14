// These hook tells set the socket up and also joins a room.
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import { SocketEvent } from 'enums';
import { UserID } from 'types';
import { UserIDState } from 'atoms/user';
import socket from 'services/socket';

function useSocket() {
    const setUserID = useSetRecoilState(UserIDState);

    useEffect(() => {
        if (!socket.id) {
            socket.emit(SocketEvent.ESTABLISH_CONNECTION);
            socket.once(SocketEvent.ESTABLISH_CONNECTION, (id: UserID) => {
                setUserID(id);
                // socket.removeEventListener(SocketEvent.ESTABLISH_CONNECTION);
            });
        }
    }, [setUserID]);
}

export default useSocket;
