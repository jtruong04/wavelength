export enum SocketEvent {
    ESTABLISH_CONNECTION = 'est connection',
    DISCONNECT = 'disconnect',
    CONNECT = 'connect',
    JOIN_ROOM = 'join room',
    LEAVE_ROOM = 'leave room',
    UPDATE_LIST = 'update list',
    REQUEST_PLAYERS = 'request players',
    UPDATE_PLAYER = 'update player',
}

export enum ChatEvent {
    MESSAGE = 'message',
}

export enum GameEvents {
    CHANGE_TEAM = 'team change',
    SET_TEAM_A_TURN = 'set A turn',
    SET_TEAM_B_TURN = 'set B turn',
    TURN_DIAL = 'turn dial',
    TOGGLE_SHIELD = 'toggle shield',
    SET_TARGET = 'set target',
    DRAG_TOKEN = 'drag token',
    SET_STATE = 'set state',
    NEXT_STATE = 'next state',
    DRAW_CARD = 'draw card',
    CLUE_SUBMITTED = 'clue submitted',
}

export enum TeamID {
    NONE = 0,
    A,
    B,
}
