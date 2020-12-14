import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useSocketState<T>(
    init: T,
    socketEvent: string,
    socket: SocketIOClient.Socket
): [T, (newState: T) => void] {
    const [state, setReactState] = useState(init);
    const setState = (newState: T) => {
        socket.emit(socketEvent, newState);
        setReactState(newState);
    };
    useSubscribeSocketToEvent(socketEvent, setReactState, socket);
    return [state, setState];
}

export function useSubscribeSocketToEvent<T>(
    socketEvent: string,
    setState: Dispatch<SetStateAction<T>>,
    socket: SocketIOClient.Socket
) {
    useEffect(() => {
        // Only add listener if it isn't already listening
        if (!socket.hasListeners(socketEvent)) {
            socket.on(socketEvent, (newState: T) => {
                setState(newState);
            });
        }
    }, [socketEvent, setState, socket]);
}
