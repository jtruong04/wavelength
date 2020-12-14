import { atom } from 'recoil';

import { Message } from 'types';

export const ChatState = atom<Message[]>({
    key: 'chat',
    default: [],
});
