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

// export const EmitFamilyEffect: (
//     event: GameEvents,
//     parameter: string
// ) => AtomEffect<any> = (event, parameter) => ({ onSet, setSelf }) => {
//     if (!socket.hasListeners(event)) {
//         socket.on(event, (payload: { parameter: string; newValue: any }) => {
//             if (payload.parameter === parameter) {
//                 setSelf(payload);
//             }
//         });
//     }
//     onSet((newValue) => {
//         socket.emit(event, { parameter, newValue });
//     });
// };
