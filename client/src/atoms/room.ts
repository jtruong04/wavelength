import { atom } from 'recoil';

import { RoomID } from 'types';

export const RoomState = atom<RoomID | null>({
    key: 'room',
    default: null,
});
