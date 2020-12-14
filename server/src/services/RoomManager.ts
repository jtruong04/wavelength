// RoomManager is a singleton that serves as an in memory database.
// If we ever expand to having permanent user accounts, we should swap
// this out with some type of ORM.

import { customAlphabet } from 'nanoid';
import englishUppercase from 'nanoid-dictionary/uppercase';
import { User, UserID, RoomID } from '../types';
const nanoid = customAlphabet(englishUppercase, 6);

class RoomManager {
    rooms: Map<RoomID, Set<UserID>>;
    users: Map<UserID, RoomID>;

    constructor() {
        this.rooms = new Map();
        this.users = new Map();
    }

    createRoom = (): RoomID => {
        let room = '';
        do {
            room = nanoid();
        } while (this.rooms.has(room));
        this.rooms.set(room, new Set());
        return room;
    };

    destroyRoom = (room: RoomID): void => {
        this.rooms.delete(room);
    };

    getPlayerList = (room: string) => {
        const playerList = this.rooms.get(room);
        if (playerList) {
            return [...playerList];
        }
        return [];
    };

    addPlayerToRoom = (room: RoomID, playerID: UserID): void => {
        const playerList = this.rooms.get(room);
        if (playerList) {
            playerList.add(playerID);
        }
        this.users.set(playerID, room);
    };

    removePlayerFromRoom = (room: string, playerID: UserID): void => {
        const playerList = this.rooms.get(room);
        if (playerList) {
            playerList.delete(playerID);
        }
    };

    getPlayersRoom = (playerID: UserID) => {
        return this.users.get(playerID) || '';
    };
}

const roomManager = new RoomManager();

export default roomManager;