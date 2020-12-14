import { atom, atomFamily, selector } from 'recoil';
import { State, TeamID } from 'enums';
import { Roster, UserIDState } from './user';

// Atoms
export const StateMachine = atom<State>({
    key: 'game state',
    default: State.LOBBY,
});

export const TurnTracker = atomFamily<number, TeamID>({
    key: 'turn tracker per team',
    default: 0,
});

export const ActiveTeam = atom({
    key: 'active team',
    default: TeamID.A,
});

export const GameOptions = atom({
    key: 'game options',
    default: {
        targetWidth: 4,
        targetScores: [4, 3, 2],
    },
});

// Derived State
export const ClueGiver = selector({
    key: 'clue giver',
    get: ({ get }) => {
        const activeTeam = get(ActiveTeam);
        const roster = get(Roster(activeTeam));
        const turn = get(TurnTracker(activeTeam));
        return roster[turn];
    },
});

export const IsClueGiver = selector({
    key: 'is clue giver',
    get: ({ get }) => {
        const cluegiver = get(ClueGiver);
        const userid = get(UserIDState);
        return cluegiver === userid;
    },
});

export const StandbyTeam = selector({
    key: 'standby team',
    get: ({ get }) => {
        const activeTeam = get(ActiveTeam);
        return activeTeam === TeamID.A ? TeamID.B : TeamID.A;
    },
});

export const ActiveTeamRoster = selector({
    key: 'active team roster',
    get: ({ get }) => {
        const activeTeam = get(ActiveTeam);
        return get(Roster(activeTeam));
    },
});

export const IsShieldOpen = selector({
    key: 'shield up',
    get: ({ get }) => {
        const userid = get(UserIDState);
        const clueGiver = get(ClueGiver);
        const state = get(StateMachine);

        if (
            state === State.LOBBY ||
            state === State.REVEAL ||
            (state === State.CLUE && userid === clueGiver)
        ) {
            return true;
        } else {
            return false;
        }
    },
});
