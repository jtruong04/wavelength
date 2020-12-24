export enum SocketEvent {
    DISCONNECT = 'disconnect',
    CONNECT = 'connect',
    ESTABLISH_CONNECTION = 'est connection',
    JOIN_ROOM = 'join room',
    REQUEST = 'REQUEST',
}

export enum GameEvents {
    SET_KNOB = 'SET_KNOB',
    SET_TARGET = 'SET_TARGET',
    SET_SCREEN = 'SET_SCREEN',
    SET_TURN = 'SET_TURN',
    SET_SPECTRUM_CARD = 'SET_SPECTRUM_CARD',
    SET_CLUE = 'SET_CLUE',
    SET_OPTIONS = 'SET_OPTIONS',
    SET_TEAM_ORDER = 'SET_TEAM_ORDER',
    SET_TEAM = 'SET_TEAM',
    SET_TEAM_ROSTER = 'SET_TEAM_ROSTER',
    SET_PLAYER = 'SET_PLAYER',
    SET_PLAYER_LIST = 'SET_PLAYER_LIST',
    NEXT = 'NEXT',
}

export enum ChatEvent {
    MESSAGE = 'message',
}

export enum HighLow {
    HIGH = 180,
    LOW = 0,
}

export enum Screen {
    OPEN = 180,
    CLOSED = 0,
}

export enum StateMachine {
    LOBBY = 'LOBBY',
    STANDBY = 'STANDBY',
    CLUE = 'CLUE',
    REVEAL = 'REVEAL',
    ACTIVE = 'ACTIVE',
    FORK = 'FORK',
}

export enum Role {
    STANDBY = 'STANDBY',
    CLUE_GIVER = 'CLUE_GIVER',
    ACTIVE = 'ACTIVE',
}
