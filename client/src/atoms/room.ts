import { atom } from 'recoil';

import { RoomID } from 'types';

export const RoomState = atom<RoomID | undefined>({
    key: 'room',
    default: undefined,
});
