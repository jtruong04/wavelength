import { ChatEvent } from 'enums';
import { atom } from 'recoil';

import { IMessage } from 'types';
import { EmitEffect } from './atomEffects';

/**
 * Stores the list of messages in chat
 */
export const ChatAtom = atom<IMessage[]>({
    key: 'chat',
    default: [],
    effects_UNSTABLE: [EmitEffect(ChatEvent.MESSAGE)],
});
