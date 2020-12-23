import { atom } from 'recoil';
import { GameEvents, StateMachine } from 'enums';

import { EmitEffect } from './atomEffects';

// Atoms
export const StateAtom = atom<StateMachine>({
    key: 'game state',
    default: StateMachine.TEAM_SELECTION,
});

export const TurnTrackerAtom = atom({
    key: 'turn tracker',
    default: {
        currentTeam: 0,
        currentPlayerOnEachTeam: [] as number[],
    },
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_TURN)],
});

export const TargetAtom = atom<number>({
    key: 'target',
    default: 0,
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_TARGET)],
});
export const DialAtom = atom<number>({
    key: 'dial',
    default: 90,
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_KNOB)],
});
export const ScreenAtom = atom<number>({
    key: 'screen',
    default: 0,
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_SCREEN)],
});
export const SpectrumCardAtom = atom<{
    text: [string, string];
    color: [string, string];
}>({
    key: 'spectrum card',
    default: { text: ['Left', 'Right'], color: ['red', 'blue'] },
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_SPECTRUM_CARD)],
});
export const ClueAtom = atom<string>({
    key: 'clue',
    default: '',
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_CLUE)],
});
