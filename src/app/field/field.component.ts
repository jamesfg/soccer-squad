import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { PositionsEnum } from '../enums/positions.enums';
import { Formation } from '../models/formation.model';
import { Player } from '../models/player.model';
import { Position } from '../models/position.model';
import { SoccerSquadService } from '../soccer-squad.service';

const WIDTH = 250;
const HEIGHT = 500;

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  selectedPosition = <string>PositionsEnum.FORWARD;
  selectedColor = 'grey';
  unSelectedColor = 'black';
  players: Player[] = [];

  positions: Position[] = [];

  formations: Formation[] = [];
  selectedFormation = "";
  postionsEnum = PositionsEnum;

  constructor(service: SoccerSquadService) { 
    this.positions = service.getPositions(this.unSelectedColor);
    this.players = service.getTeam();
    this.formations = service.getFormations();
    this.selectedFormation = this.formations[0].value
  }

  ngOnInit(): void {
    this.drawField();
  }

  getPlayerPositions(player: Player): string {
    var playerPostionsString = "";
    player.positions.forEach((p, index) => {
      var comma = index === player.positions.length - 1 ? '' : ', '
      playerPostionsString += `${<string>p}${comma}`
    });

    return playerPostionsString;
  }

  getSquadCounts(positionEnum: PositionsEnum): number {
    return this.players.filter(p => p.positions.includes(positionEnum)).length;
  }
  getSquad(): Player[] {
    return this.players.filter(p => p.positions.findIndex(positon => <string>positon === this.selectedPosition) > -1);
  }

  selectPosition() {
    d3.select("svg").remove();
    this.positions.forEach(p => {
      p.color = this.unSelectedColor;
    });
    this.drawField();
  }

  selectFormation() {
    d3.select("svg").remove();
    this.positions.forEach(p => {
      p.color = this.unSelectedColor;
    });
    this.drawField();
  }

  drawField() {
    let holder = d3.select('#field') // select the 'field' element
    .append('svg')           // append an SVG element to the body
    .attr('width', WIDTH)      
    .attr('height', HEIGHT);   

  // draw a rectangle - pitch
  holder.append('rect')        // attach a rectangle
      .attr('x', 0)         // position the left of the rectangle
      .attr('y', 0)          // position the top of the rectangle
      .attr('width', WIDTH)  
      .attr('height', HEIGHT)    
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')    // set the line colour
      .style('fill', '#2e8f2d');    // set the fill colour 


  // draw a rectangle - halves
  holder.append('rect')        // attach a rectangle
      .attr('x', 0)         // position the left of the rectangle
      .attr('y', 0)          // position the top of the rectangle
      .attr('height', WIDTH)    // set the height
      .attr('width', WIDTH)    // set the width
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')    // set the line colour
      .style('fill', '#2e8f2d');    // set the fill colour 


  // draw a circle - center circle
  holder.append('circle')          // attach a circle
      .attr('cy', WIDTH)             // position the x-centre
      .attr('cx', WIDTH / 2)             // position the y-centre
      .attr('r', 50)               // set the radius
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')      // set the line colour
      .style('fill', 'none');      // set the fill colour


  // draw a rectangle - penalty area 1
  holder.append('rect')        // attach a rectangle
      .attr('y', 0)         // position the left of the rectangle
      .attr('x', 52.5)          // position the top of the rectangle
      .attr('width', 145)    
      .attr('height', 85)    
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')    // set the line colour
      .style('fill', '#2e8f2d');    // set the fill colour 


  // draw a rectangle - penalty area 2
  holder.append('rect')        // attach a rectangle
      .attr('y', 415)         // position the left of the rectangle
      .attr('x', 52.5)          // position the top of the rectangle
      .attr('width', 145)    
      .attr('height', 85)    
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')    // set the line colour
      .style('fill', '#2e8f2d');    // set the fill colour 

  // draw a rectangle - six yard box 1
  holder.append('rect')        // attach a rectangle
      .attr('y', 0)         // position the left of the rectangle
      .attr('x', 92)          // position the top of the rectangle
      .attr('width', 66)    // set the height
      .attr('height', 30)    // set the width
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')    // set the line colour
      .style('fill', '#2e8f2d');    // set the fill colour 

  // draw a rectangle - six yard box 2
  holder.append('rect')        // attach a rectangle
      .attr('y', 470)         // position the left of the rectangle
      .attr('x', 92)          // position the top of the rectangle
      .attr('width', 66)    // set the height
      .attr('height', 30)    // set the width
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')    // set the line colour
      .style('fill', '#2e8f2d');    // set the fill colour 


  // draw a circle - penalty spot 1
  holder.append('circle')        // attach a circle
      .attr('cy', 60)           // position the x-centre
      .attr('cx', 125)           // position the y-centre
      .attr('r', 5)             // set the radius
      .style('fill', '#fff');     // set the fill colour

  // draw a circle - penalty spot 2
  holder.append('circle')        // attach a circle
      .attr('cy', 440)           // position the x-centre
      .attr('cx', 125)           // position the y-centre
      .attr('r', 5)             // set the radius
      .style('fill', '#fff');     // set the fill colour

  // draw a circle - center spot
  holder.append('circle')        // attach a circle
      .attr('cy', HEIGHT / 2)           // position the x-centre
      .attr('cx', WIDTH / 2)           // position the y-centre
      .attr('r', 5)             // set the radius
      .style('fill', '#fff');     // set the fill colour


  // penalty box semi-circle 1
  holder.append('path')
    .attr('d', <any>d3.arc()
    .innerRadius(35)
  .outerRadius(37.5)
  .startAngle(4.5) 
  .endAngle(1.75))
    .attr('fill', '#fff')
    .attr('transform', 'translate(125,77.5)');

  holder.append('path')
    .attr('d', <any>d3.arc()
    .innerRadius(35)
    .outerRadius(37.5)
    .startAngle(-1.5)
    .endAngle(1.5) )
    .attr('fill', '#fff')
    .attr('transform', 'translate(125,417.5)');

    this.drawForward(holder);
    this.drawMidfield(holder);
    this.drawDefense(holder);
    this.drawKeeper(holder);

  }

  drawForward(holder:any) {
    let position = <Position>this.positions.find(p => p.position == PositionsEnum.FORWARD);
    let formation = <Formation>this.formations.find(f=> f.value === this.selectedFormation);

    if(this.selectedPosition === <string>PositionsEnum.FORWARD) {
      position.color = this.selectedColor;
    }

    for(let i = 0; i<formation.forward; i++) {
      let distance  = WIDTH / formation.forward;
      holder.append('circle')          // attach a circle
        .attr('cy', 150)             // position the x-centre
        .attr('cx', (distance * i) + (distance / 2))             // position the y-centre
        .attr('r', 20)               // set the radius
        .style('stroke-width', 3)    // set the stroke width
        .style('stroke', 'black')      // set the line colour
        .style('fill', position?.color);      // set the fill colour

        holder.append("text")
        .text("F")
        .attr("x", ((distance * i) + (distance / 2)) - 3)
        .attr("y", 154)
        .attr('fill', 'white');
    }
  }

  drawMidfield(holder:any) {
    let position = <Position>this.positions.find(p => p.position == PositionsEnum.MIDFIELD);
    let formation = <Formation>this.formations.find(f=> f.value === this.selectedFormation);

    if(this.selectedPosition === <string>PositionsEnum.MIDFIELD) {
      position.color = this.selectedColor;
    }

    for(let i = 0; i<formation.midfield; i++) {
      let distance  = WIDTH / formation.midfield;
      holder.append('circle')          // attach a circle
        .attr('cy', 250)             // position the x-centre
        .attr('cx', (distance * i) + (distance / 2))             // position the y-centre
        .attr('r', 20)               // set the radius
        .style('stroke-width', 3)    // set the stroke width
        .style('stroke', 'black')      // set the line colour
        .style('fill', position?.color);      // set the fill colour

        holder.append("text")
        .text("M")
        .attr("x", ((distance * i) + (distance / 2)) - 6)
        .attr("y", 254)
        .attr('fill', 'white');
    }
  }

  drawDefense(holder:any) {
    let position = <Position>this.positions.find(p => p.position == PositionsEnum.DEFENSE);
    let formation = <Formation>this.formations.find(f=> f.value === this.selectedFormation);

    if(this.selectedPosition === <string>PositionsEnum.DEFENSE) {
      position.color = this.selectedColor;
    }

    for(let i = 0; i<formation.defense; i++) {
      let distance  = WIDTH / formation.defense;
      console.log(distance);
      holder.append('circle')          // attach a circle
        .attr('cy', 375)             // position the x-centre
        .attr('cx', (distance * i) + (distance / 2))             // position the y-centre
        .attr('r', 20)               // set the radius
        .style('stroke-width', 3)    // set the stroke width
        .style('stroke', 'black')      // set the line colour
        .style('fill', position?.color);      // set the fill colour

        holder.append("text")
        .text("D")
        .attr("x", ((distance * i) + (distance / 2)) - 4)
        .attr("y", 380)
        .attr('fill', 'white');
    }
  }

  drawKeeper(holder: any) {
    let position = <Position>this.positions.find(p => p.position == PositionsEnum.GOALKEEPER);
    //goalie
    if(this.selectedPosition === <string>PositionsEnum.GOALKEEPER) {
      position.color = this.selectedColor;
    }

    holder.append('circle')          // attach a circle
    .attr('cy', 460)             // position the x-centre
    .attr('cx', 125)             // position the y-centre
    .attr('r', 20)               // set the radius
    .style('stroke-width', 3)    // set the stroke width
    .style('stroke', 'black')      // set the line colour
    .style('fill', position.color);      // set the fill colour

    holder.append("text")
    .text("K")
    .attr("x", 120)
    .attr("y", 465)
    .attr('fill', 'white');
  }
}
