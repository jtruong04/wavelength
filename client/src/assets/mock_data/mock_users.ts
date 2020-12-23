import { ITeam, IUser, TeamID, UserID } from 'types';

const data: {
    playerList: UserID[];
    players: { [key: string]: IUser };
    teamOrder: TeamID[];
    teams: { [key: string]: ITeam & { roster: UserID[] } };
} = {
    playerList: ['user_A', 'user_B', 'user_C', 'user_E', 'user_F'],
    players: {
        user_A: {
            id: 'user_A',
            name: 'Armando',
            avatarid: 20,
            team: 'A',
        },
        user_B: {
            id: 'user_B',
            name: 'Maggee',
            avatarid: 12,
            team: 'B',
        },
        user_C: {
            id: 'user_C',
            name: 'Tabbatha',
            avatarid: 28,
            team: 'A',
        },
        user_E: {
            id: 'user_E',
            name: 'Stace',
            avatarid: 7,
            team: 'B',
        },
        user_F: {
            id: 'user_F',
            name: 'Tish',
            avatarid: 16,
            team: 'A',
        },
    },
    teams: {
        team_A: {
            id: 'team_A',
            name: 'Frami and Sons',
            color: '#fd982b',
            score: 0,
            roster: ['user_A', 'user_C', 'user_F'],
        },
        team_B: {
            id: 'team_B',
            name: "Auer, O'Kon and Barrows",
            color: '#3ac5d6',
            score: 0,
            roster: ['user_B', 'user_E'],
        },
    },
    teamOrder: ['team_A', 'team_B'],
};

export default data;
