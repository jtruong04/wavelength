import { atom } from 'recoil';

import { IMessage } from 'types';

export const ChatState = atom<IMessage[]>({
    key: 'chat',
    default: [],
});
