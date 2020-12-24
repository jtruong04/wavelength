import { SocketEvent } from 'enums';
import { AtomEffect } from 'recoil';
import socket from 'services/socket';

// Effects
export const EmitEffect: (event: string) => AtomEffect<any> = (event) => ({
    onSet,
    setSelf,
    trigger,
}) => {
    if (trigger === 'get') {
        socket.emit(SocketEvent.REQUEST, event, (val: any) => {
            if (val) {
                setSelf(val);
            }
        });
    }
    socket.on(event, (newValue: any) => {
        setSelf(newValue);
    });
    onSet((newValue) => {
        socket.emit(event, newValue);
    });
    return () => {
        socket.off(event);
    };
};

export const LoggerEffect: (label: string) => AtomEffect<any> = (
    label: string
) => ({ onSet }) => {
    onSet((newValue, oldValue) => {
        console.debug(`${label} \n`, oldValue, ' ---> ', newValue);
    });
};
