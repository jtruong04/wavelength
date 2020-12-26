// Generic Types
export type Point = {
    x: number;
    y: number;
};

// Common Types
export type UserID = string;
export type TeamID = string;
export type RoomID = string;

export interface IUser {
    id: UserID;
    name: string;
    avatarid?: number;
    team?: TeamID;
    host?: boolean;
}

export interface ITeam {
    id: string;
    name: string;
    color?: string;
    score: number;
}
export type ITeamWithRoster = ITeam & { roster: UserID[] };

export interface IMessage {
    userid: UserID;
    body: string;
}

export interface ICard {
    text: [string, string];
    color: [string, string];
}
