import { atom, selector } from 'recoil';
import { GameEvents, OverUnder, Role, Screen, StateMachine } from 'enums';

import { EmitEffect } from './atomEffects';
import { MyIDAtom, PlayerAtom } from './user';
import { RosterAtom, TeamOrderingAtom } from './team';
import { ICard } from 'types';

// Atoms
export const StateAtom = atom<StateMachine>({
    key: 'game state',
    default: StateMachine.LOBBY,
});

export const TurnTrackerAtom = atom<{
    currentTeam: number;
    currentPlayerOnEachTeam: number[];
    // numPlayers: number[];
}>({
    key: 'turn tracker',
    default: {
        currentTeam: 0,
        currentPlayerOnEachTeam: [],
        // numPlayers: [],
    },
    effects_UNSTABLE: [
        // EmitEffect(GameEvents.SET_TURN),
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
export const SpectrumCardAtom = atom<ICard>({
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
export const OverUnderAtom = atom<OverUnder | null>({
    key: 'over under',
    default: null,
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_OVERUNDER)],
});
export const ReadyAtom = atom<boolean>({
    key: 'ready state',
    default: false,
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_READY)],
});

// Selectors
export const KnobLockSelector = selector({
    key: 'knob lock',
    get: ({ get }) => {
        const state = get(StateAtom);
        const ready = get(ReadyAtom);

        return (
            [
                StateMachine.CLUE,
                StateMachine.STANDBY,
                StateMachine.REVEAL,
            ].includes(state) || ready
        );
    },
});

export const ScreenLockSelector = selector({
    key: 'screen lock',
    get: ({ get }) => {
        const state = get(StateAtom);
        const clue = get(ClueAtom);
        const ready = get(ReadyAtom);
        return (
            [StateMachine.ACTIVE, StateMachine.STANDBY].includes(state) ||
            (state === StateMachine.CLUE && clue && !ready)
        );
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

export const ActivePlayerName = selector({
    key: 'active player',
    get: ({ get }) => {
        const teams = get(TeamOrderingAtom);
        const turnTracker = get(TurnTrackerAtom);
        const activeRoster = get(RosterAtom(teams[turnTracker.currentTeam]));
        const activeid =
            activeRoster[
                turnTracker.currentPlayerOnEachTeam[turnTracker.currentTeam]
            ];
        const user = get(PlayerAtom(activeid));
        return user.name;
    },
});
