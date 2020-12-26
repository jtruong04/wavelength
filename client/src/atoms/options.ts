import { CardType, GameEvents } from 'enums';
import { atom } from 'recoil';
import { EmitEffect } from './atomEffects';

export const OptionsAtom = atom<{
    targetWidth: number;
    targetScores: [number, number, number];
    cardType: CardType;
    numCards: number;
}>({
    key: 'game options',
    default: {
        targetWidth: 4,
        targetScores: [4, 3, 2],
        cardType: CardType.BOTH,
        numCards: 2,
    },
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_OPTIONS)],
});
