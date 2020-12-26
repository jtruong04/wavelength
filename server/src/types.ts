// Generic Types
export type Point = {
    x: number;
    y: number;
};

// Common Types
export type UserID = string;
export type RoomID = string;
export type TeamID = string;

export interface IUser {
    id: UserID;
    name: string;
    avatarid?: number;
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
