import { GameEvents } from 'enums';
import { atom } from 'recoil';
import { EmitEffect } from './atomEffects';

export const OptionsAtom = atom({
    key: 'game options',
    default: {
        targetWidth: 4,
        targetScores: [4, 3, 2],
    },
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_OPTIONS)],
});
