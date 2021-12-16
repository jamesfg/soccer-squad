import { Injectable } from '@angular/core';
import { PositionsEnum } from './enums/positions.enums';
import { Formation } from './models/formation.model';
import { Player } from './models/player.model';
import { Position } from './models/position.model';

@Injectable({
  providedIn: 'root'
})
export class SoccerSquadService {

  constructor() { }

  getTeam(): Player[] {
    return [
      {
        name: "James Garcia",
        positions: [PositionsEnum.MIDFIELD, PositionsEnum.FORWARD, PositionsEnum.DEFENSE]
      },
  
      {
        name: "Jono Hill",
        positions: [PositionsEnum.FORWARD, PositionsEnum.MIDFIELD],
        notes: "Striker preferred or mid wings"
      },
      {
        name: "Em Wells",
        positions: [PositionsEnum.DEFENSE],
        notes: "Possible move to defensive mid"
      },
      {
        name: "Omar Gonzales",
        positions: [PositionsEnum.FORWARD, PositionsEnum.MIDFIELD, PositionsEnum.DEFENSE],
        notes: "If defense, on the outside"
      }
    ];
  }

  getFormations(): Formation[] {
    return [
      {defense: 4, midfield:4, forward: 2, value: '442'},
      {defense: 4, midfield:3, forward: 3, value: '433'},
      {defense: 3, midfield:4, forward: 3, value: '343'},
      {defense: 5, midfield:4, forward: 1, value: '541'},
    ];
  }

  getPositions(unSelectedColor: string): Position[] {
    return [
      {color: unSelectedColor, position: PositionsEnum.FORWARD},
      {color: unSelectedColor, position: PositionsEnum.MIDFIELD},
      {color: unSelectedColor, position: PositionsEnum.DEFENSE},
      {color: unSelectedColor, position: PositionsEnum.GOALKEEPER}
    ];
  }
}