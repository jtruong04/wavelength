import { atom } from 'recoil';
import { RoomID } from 'types';

export const RoomAtom = atom<RoomID | undefined>({
    key: 'room',
    default: undefined,
});
