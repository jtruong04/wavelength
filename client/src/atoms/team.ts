import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { ITeam, ITeamWithRoster, TeamID, UserID } from 'types';

import Chance from 'chance';
import { EmitEffect } from './atomEffects';
import { GameEvents } from 'enums';
const chance = new Chance();

// Atoms

export const TeamOrderingAtom = atom<TeamID[]>({
    key: 'team order',
    default: [],
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_TEAM_ORDER)],
});

export const TeamAtom = atomFamily<ITeam, TeamID>({
    key: 'team',
    default: (parameter) => ({
        id: parameter,
        name: `Team ${chance.animal()}`,
        color: chance.color({ format: 'hex' }),
        score: 0,
    }),
    effects_UNSTABLE: (parameter) => [
        EmitEffect(`${GameEvents.SET_TEAM}_${parameter}`),
    ],
});

export const RosterAtom = atomFamily<UserID[], TeamID>({
    key: 'team roster',
    default: [],
    effects_UNSTABLE: (parameter) => [
        EmitEffect(`${GameEvents.SET_TEAM_ROSTER}_${parameter}`),
    ],
});

// Selectors

export const TeamWithRosterSelector = selectorFamily<ITeamWithRoster, TeamID>({
    key: 'team with roster',
    get: (parameter) => ({ get }) => {
        const team = get(TeamAtom(parameter));
        const roster = get(RosterAtom(parameter));
        return {
            ...team,
            roster,
        };
    },
    set: (parameter) => ({ set }, newValue) => {
        const { roster, ...team } = newValue as ITeamWithRoster;
        set(RosterAtom(parameter), roster);
        set(TeamAtom(parameter), team);
    },
});

export const TeamNameSelector = selectorFamily<string, TeamID>({
    key: 'team name',
    get: (parameter) => ({ get }) => {
        return get(TeamAtom(parameter)).name;
    },
    set: (parameter) => ({ set }, newValue) => {
        set(
            TeamAtom(parameter),
            (prevValue) => ({ ...prevValue, name: newValue } as ITeam)
        );
    },
});

export const RosterSizesSelector = selector({
    key: 'roster sizes',
    get: ({ get }) => {
        const teams = get(TeamOrderingAtom);
        return teams.map((teamid) => get(RosterAtom(teamid)).length);
    },
});
