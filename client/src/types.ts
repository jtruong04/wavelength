import { TeamID } from 'enums';

// Generic Types
export type Point = {
    x: number;
    y: number;
};

// Common Types
export type UserID = string;
export interface User {
    id: UserID;
    name: string;
    avatar?: number;
    team?: TeamID;
    host?: boolean;
    tokenPosition?: Point;
}
export type PlayerMap = Map<UserID, User>;
export type RoomID = string;
export interface Team {
    name: string;
    color?: string;
    score: number;
}

export interface IMessage {
    id: UserID;
    name?: string;
    avatar?: number;
    color?: string;
    body: string;
}
