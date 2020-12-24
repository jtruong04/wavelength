import { GameEvents } from 'enums';
import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { IUser, TeamID, UserID } from 'types';
import { EmitEffect } from './atomEffects';
import { RosterAtom, TeamOrderingAtom } from './team';
// import { TeamID } from 'enums';
// import produce from 'immer';
// import teamDefaults from 'assets/teamNames.json';

// Base States
export const MyIDAtom = atom<UserID>({
    key: 'userid',
    default: '',
});

export const PlayerAtom = atomFamily<IUser, UserID>({
    key: 'player',
    default: (parameter) => ({
        id: parameter,
        name: 'No Name',
        avatarid: 99,
        // team: 'default_team',
        host: false,
    }),
    effects_UNSTABLE: (parameter) => [
        EmitEffect(`${GameEvents.SET_PLAYER}_${parameter}`),
    ],
});

export const PlayerListAtom = atom<UserID[]>({
    key: 'player list',
    default: [],
    effects_UNSTABLE: [EmitEffect(GameEvents.SET_PLAYER_LIST)],
});

// Derived States

export const PlayerTeamSelector = selectorFamily<TeamID, UserID>({
    key: 'player team',
    get: (parameter) => ({ get }) => {
        const teams = get(TeamOrderingAtom);
        const team = teams.filter((team) => {
            const roster = get(RosterAtom(team));
            return roster.includes(parameter);
        });
        return team[0];
    },
    set: (parameter) => ({ get, set }, newValue) => {
        const teams = get(TeamOrderingAtom);
        teams.forEach((teamid) => {
            set(RosterAtom(teamid), (currVal) =>
                currVal.filter((userid) => userid !== parameter)
            );
        });
        set(RosterAtom(newValue as string), (currVal) => [
            ...currVal,
            parameter,
        ]);
    },
});

export const IsCurrentOnTeamSelector = selector({
    key: 'is on team',
    get: ({ get }) => {
        const teams = get(TeamOrderingAtom);
        const myid = get(MyIDAtom);
        const team = teams.filter((team) => {
            const roster = get(RosterAtom(team));
            return roster.includes(myid);
        });
        return team.length > 0;
    },
});

export const UserSelector = selector<IUser>({
    key: 'me',
    get: ({ get }) => {
        const userid = get(MyIDAtom);
        return get(PlayerAtom(userid));
    },
    set: ({ get, set }, newValue) => {
        const userid = get(MyIDAtom);
        set(PlayerAtom(userid), newValue);
    },
});
