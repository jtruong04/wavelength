import { TeamID } from './enums';

// Generic Types
export type Point = {
    x: number;
    y: number;
};

// Common Types
export type UserID = string;
export interface User {
    id: string;
    name: string;
    avatar?: number;
    team?: TeamID;
}
// export type PlayerSet = Set<UserID>;
export type RoomID = string;
