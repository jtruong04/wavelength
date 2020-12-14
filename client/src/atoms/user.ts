import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { User, UserID, Team, Point } from 'types';
import { TeamID } from 'enums';
// import produce from 'immer';
import teamDefaults from 'assets/teamNames.json';

// Base States
export const UserIDState = atom<UserID>({
    key: 'userid',
    default: '',
});

export const PlayerListState = atom<UserID[]>({
    key: 'player list',
    default: [],
});

export const PlayerState = atomFamily<User, UserID>({
    key: 'player',
    default: {
        id: '',
        name: '',
        avatar: undefined,
        team: TeamID.NONE,
        host: false,
        tokenPosition: {
            x: Math.random() * 10 + 45,
            y: Math.random() * 50 + 25,
        },
    },
});

export const TeamState = atomFamily<Team, TeamID>({
    key: 'team',
    default: (param) => ({
        name: teamDefaults.names[0][param === TeamID.A ? 0 : 1],
        color: teamDefaults.colors[param === TeamID.A ? 0 : 1],
        score: 0,
    }),
});

// Derived States

export const Me = selector<User>({
    key: 'me',
    get: ({ get }) => {
        const userid = get(UserIDState);
        return get(PlayerState(userid));
    },
    set: ({ get, set }, newValue) => {
        const userid = get(UserIDState);
        set(PlayerState(userid), newValue);
    },
});

export const HostState = selector({
    key: 'host',
    get: ({ get }) => get(Me).host,
});

export const TokenStates = selectorFamily<Point, UserID>({
    key: 'token position',
    get: (parameter) => ({ get }) => {
        const user = get(PlayerState(parameter));
        return user.tokenPosition || { x: 50, y: 50 };
    },
    set: (parameter) => ({ set }, newValue) => {
        set(PlayerState(parameter), (prevValue) => {
            return { ...prevValue, tokenPosition: newValue as Point };
        });
    },
});

export const PlayerTeamStates = selectorFamily<TeamID, UserID>({
    key: 'player team position',
    get: (parameter) => ({ get }) => {
        const user = get(PlayerState(parameter));
        return user.team || TeamID.NONE;
    },
    set: (parameter) => ({ set }, newValue) => {
        set(PlayerState(parameter), (prevValue) => {
            return { ...prevValue, team: newValue as TeamID };
        });
    },
});

export const Roster = selectorFamily<UserID[], TeamID>({
    key: 'roster',
    get: (parameter) => ({ get }) => {
        const playerList = get(PlayerListState);
        return playerList.filter(
            (player) => get(PlayerTeamStates(player)) === parameter
        );
    },
});

export const ScoreState = selectorFamily<number, TeamID>({
    key: 'scores',
    get: (parameter) => ({ get }) => {
        return get(TeamState(parameter)).score;
    },
    set: (parameter) => ({ set }, newValue) => {
        set(TeamState(parameter), (prevValue) => ({
            ...prevValue,
            score: newValue as number,
        }));
    },
});
