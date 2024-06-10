export interface Tournament {
    name: string;
    location: string;
    rounds: Round[]
}
export interface Round {
    index?: number;
    date: string;
    live?: boolean;
    pairs: Pair[];

}

export interface Pair {
    white: string;
    black: string;
    result: string;
    live: boolean
}
export interface Move {
    san: string;
    fen: string;
    time: number;
    moveTime: number;
    arrow: string[];
    movedAt?: number; // Epoch of move
}

export type GameMap = {
    [x: string]: GameEventResponse
}


export interface GameEventResponse {
    pair: Pair,
    isLive: boolean;
    delayedMoves?: number;
    pointInTime?: number;
    round: number,
    game: number;
    moves: Move[];
    result?: string;
}