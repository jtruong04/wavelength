import { TeamID } from './enums';

// Generic Types
export type Point = {
    x: number;
    y: number;
};

// Common Types
export type UserID = string;
export type RoomID = string;
export interface IUser {
    id: string;
    name: string;
    avatar?: number;
    team?: TeamID;
}
// export type PlayerSet = Set<UserID>;

export interface IMessage {
    id: UserID;
    name?: string;
    avatar?: number;
    color?: string;
    body: string;
}
