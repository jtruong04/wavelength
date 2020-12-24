import { atom, selector } from 'recoil';
import { GameEvents, Role, Screen, StateMachine } from 'enums';

import { EmitEffect, LoggerEffect } from './atomEffects';
import { MyIDAtom } from './user';
import { RosterAtom, TeamOrderingAtom } from './team';

// Atoms
export const StateAtom = atom<StateMachine>({
    key: 'game state',
    default: StateMachine.LOBBY,
});

export const TurnTrackerAtom = atom<{
    currentTeam: number;
    currentPlayerOnEachTeam: number[];
    numPlayers: number[];
}>({
    key: 'turn tracker',
    default: {
        currentTeam: 0,
        currentPlayerOnEachTeam: [],
        numPlayers: [],
    },
    effects_UNSTABLE: [
        EmitEffect(GameEvents.SET_TURN),
        // LoggerEffect('Turn tracker'),
    ],
});

export const TargetAtom = atom<number>({
    key: 'target',
    default: 0,
    effects_UNSTABLE: [
        EmitEffect(GameEvents.SET_TARGET),
        // LoggerEffect('Target'),
    ],
});
export const KnobAtom = atom<number>({
    key: 'knob',
    default: 90,
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_KNOB)],
});
export const ScreenAtom = atom<number | Screen>({
    key: 'screen',
    default: Screen.CLOSED,
    effects_UNSTABLE: [
        EmitEffect(GameEvents.SET_SCREEN),
        // LoggerEffect('Screen'),
    ],
});
export const SpectrumCardAtom = atom<{
    text: [string, string];
    color: [string, string];
}>({
    key: 'spectrum card',
    default: { text: ['Left', 'Right'], color: ['red', 'blue'] },
    effects_UNSTABLE: [
        EmitEffect(GameEvents.SET_SPECTRUM_CARD),
        // LoggerEffect('Spectrum'),
    ],
});
export const ClueAtom = atom<string>({
    key: 'clue',
    default: '',
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_CLUE)],
});

// Selectors
export const KnobLockSelector = selector({
    key: 'knob lock',
    get: ({ get }) => {
        const state = get(StateAtom);
        return [
            StateMachine.CLUE,
            StateMachine.STANDBY,
            StateMachine.REVEAL,
        ].includes(state);
    },
});

export const ScreenLockSelector = selector({
    key: 'screen lock',
    get: ({ get }) => {
        const state = get(StateAtom);
        return [StateMachine.ACTIVE, StateMachine.STANDBY].includes(state);
    },
});

export const UserRoleSelector = selector({
    key: 'role',
    get: ({ get }) => {
        const myid = get(MyIDAtom);
        const teams = get(TeamOrderingAtom);
        const turnTracker = get(TurnTrackerAtom);
        const activeRoster = get(RosterAtom(teams[turnTracker.currentTeam]));
        if (!activeRoster.includes(myid)) {
            return Role.STANDBY;
        }
        if (
            activeRoster[
                turnTracker.currentPlayerOnEachTeam[turnTracker.currentTeam]
            ] === myid
        ) {
            return Role.CLUE_GIVER;
        }
        return Role.ACTIVE;
    },
});

export const RosterSizesSelector = selector({
    key: 'roster sizes',
    get: ({ get }) => {
        const teams = get(TeamOrderingAtom);
        return teams.map((teamid) => get(RosterAtom(teamid)).length);
    },
});
