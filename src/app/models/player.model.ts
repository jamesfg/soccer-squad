import { PositionsEnum } from "../enums/positions.enums";

export interface Player {
    name: string;
    positions: PositionsEnum[];
    notes?: string;
}