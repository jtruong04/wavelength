import { GameEvents, SocketEvent } from 'enums';
import { useEffect } from 'react';
import {
    RecoilState,
    useRecoilCallback,
    useRecoilValue,
    useRecoilState,
    useSetRecoilState,
} from 'recoil';
import socket from 'services/socket';

export function useSocketRecoilFamily<T, P>(
    recoilFamily: (param: P) => RecoilState<T>,
    parameter: P,
    socketEvent: SocketEvent | GameEvents
): [T, (param: P, state: T) => void] {
    const value = useRecoilValue(recoilFamily(parameter));
    const setFamilyMember = useRecoilCallback(
        ({ set }) => (param: P, newValue: T, preventBroadcast?: boolean) => {
            if (!preventBroadcast) {
                socket.emit(socketEvent, { parameter, newValue });
            }
            set(recoilFamily(param), newValue);
        }
    );

    useEffect(() => {
        // Only add listener if it isn't already listening
        if (!socket.hasListeners(socketEvent)) {
            socket.on(socketEvent, (payload: { parameter: P; newValue: T }) => {
                setFamilyMember(payload.parameter, payload.newValue, true);
            });
        }
    }, [socketEvent, setFamilyMember]);

    return [value, setFamilyMember];
}

export function useSetSocketRecoilFamily<T, P>(
    recoilFamily: (param: P) => RecoilState<T>,
    parameter: P,
    socketEvent: SocketEvent | GameEvents
) {
    // const value = useRecoilValue(recoilFamily(parameter));
    const setFamilyMember = useRecoilCallback(
        ({ set }) => (param: P, newValue: T, preventBroadcast?: boolean) => {
            if (!preventBroadcast) {
                socket.emit(socketEvent, { parameter, newValue });
            }
            set(recoilFamily(param), newValue);
        }
    );

    useEffect(() => {
        // Only add listener if it isn't already listening
        if (!socket.hasListeners(socketEvent)) {
            socket.on(socketEvent, (payload: { parameter: P; newValue: T }) => {
                setFamilyMember(payload.parameter, payload.newValue, true);
            });
        }
    }, [socketEvent, setFamilyMember]);

    return setFamilyMember;
}

export function useSocketRecoilState<T>(
    recoilState: RecoilState<T>,
    socketEvent: string
): [T, (newState: T) => void] {
    const [state, setRecoilState] = useRecoilState(recoilState);

    const setState = useRecoilCallback(({ set }) => (newValue: T) => {
        socket.emit(socketEvent, { newValue });
        set(recoilState, newValue);
    });

    useEffect(() => {
        if (!socket.hasListeners(socketEvent)) {
            socket.on(socketEvent, (payload: { newValue: T }) => {
                setRecoilState(payload.newValue);
            });
        }
    }, [socketEvent, setRecoilState]);
    return [state, setState];
}

export function useSetSocketRecoilState<T>(
    recoilState: RecoilState<T>,
    socketEvent: string
) {
    const setRecoilState = useSetRecoilState(recoilState);

    const setState = useRecoilCallback(({ set }) => (newValue: T) => {
        socket.emit(socketEvent, { newValue });
        set(recoilState, newValue);
    });

    useEffect(() => {
        if (!socket.hasListeners(socketEvent)) {
            socket.on(socketEvent, (payload: { newValue: T }) => {
                setRecoilState(payload.newValue);
            });
        }
    }, [socketEvent, setRecoilState]);
    return setState;
}
