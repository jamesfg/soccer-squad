import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import { PositionsEnum } from '../enums/positions.enums';
import { Formation } from '../models/formation.model';
import { Player } from '../models/player.model';
import { Position } from '../models/position.model';

const WIDTH = 500;
const HEIGHT = 1000;

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {
  selectedPosition = <string>PositionsEnum.FORWARD;
  selectedColor = 'grey';
  unSelectedColor = 'black';
  players: Player[] = [
    {
      name: "James Garcia",
      positions: [PositionsEnum.MIDFIELD, PositionsEnum.FORWARD, PositionsEnum.DEFENSE]
    },

    {
      name: "Maya",
      positions: [PositionsEnum.GOALKEEPER, PositionsEnum.FORWARD, PositionsEnum.MIDFIELD]
    }
  ];

  positions: Position[] = [
    {color: this.unSelectedColor, position: PositionsEnum.FORWARD},
    {color: this.unSelectedColor, position: PositionsEnum.MIDFIELD},
    {color: this.unSelectedColor, position: PositionsEnum.DEFENSE},
    {color: this.unSelectedColor, position: PositionsEnum.GOALKEEPER}
  ];

  formations: Formation[] = [
    {defense: 4, midfield:4, forward: 2, value: '442'},
    {defense: 4, midfield:3, forward: 3, value: '433'},
    {defense: 3, midfield:4, forward: 3, value: '343'},
    {defense: 5, midfield:4, forward: 1, value: '541'},
  ];
  selectedFormation = this.formations[0].value;

  constructor() { }

  ngOnInit(): void {
    this.drawField();
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
      .attr('x', 105)          // position the top of the rectangle
      .attr('width', 290)    
      .attr('height', 170)    
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')    // set the line colour
      .style('fill', '#2e8f2d');    // set the fill colour 


  // draw a rectangle - penalty area 2
  holder.append('rect')        // attach a rectangle
      .attr('y', 830)         // position the left of the rectangle
      .attr('x', 105)          // position the top of the rectangle
      .attr('width', 290)    
      .attr('height', 170)    
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')    // set the line colour
      .style('fill', '#2e8f2d');    // set the fill colour 

  // draw a rectangle - six yard box 1
  holder.append('rect')        // attach a rectangle
      .attr('y', 0)         // position the left of the rectangle
      .attr('x', 184)          // position the top of the rectangle
      .attr('width', 132)    // set the height
      .attr('height', 60)    // set the width
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')    // set the line colour
      .style('fill', '#2e8f2d');    // set the fill colour 

  // draw a rectangle - six yard box 2
  holder.append('rect')        // attach a rectangle
      .attr('y', 940)         // position the left of the rectangle
      .attr('x', 184)          // position the top of the rectangle
      .attr('width', 132)    // set the height
      .attr('height', 60)    // set the width
      .style('stroke-width', 5)    // set the stroke width
      .style('stroke', '#fff')    // set the line colour
      .style('fill', '#2e8f2d');    // set the fill colour 


  // draw a circle - penalty spot 1
  holder.append('circle')        // attach a circle
      .attr('cy', 120)           // position the x-centre
      .attr('cx', 250)           // position the y-centre
      .attr('r', 5)             // set the radius
      .style('fill', '#fff');     // set the fill colour

  // draw a circle - penalty spot 2
  holder.append('circle')        // attach a circle
      .attr('cy', 880)           // position the x-centre
      .attr('cx', 250)           // position the y-centre
      .attr('r', 5)             // set the radius
      .style('fill', '#fff');     // set the fill colour

  // draw a circle - center spot
  holder.append('circle')        // attach a circle
      .attr('cy', 500)           // position the x-centre
      .attr('cx', 250)           // position the y-centre
      .attr('r', 5)             // set the radius
      .style('fill', '#fff');     // set the fill colour


  // penalty box semi-circle 1
      

  holder.append('path')
    .attr('d', <any>d3.arc()
    .innerRadius(70)
  .outerRadius(75)
  .startAngle(4.5) 
  .endAngle(1.75))
    .attr('fill', '#fff')
    .attr('transform', 'translate(250,155)');

  holder.append('path')
    .attr('d', <any>d3.arc()
    .innerRadius(70)
    .outerRadius(75)
    .startAngle(-1.5)
    .endAngle(1.5) )
    .attr('fill', '#fff')
    .attr('transform', 'translate(250,835)');

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
        .attr('cy', 300)             // position the x-centre
        .attr('cx', (distance * i) + (distance / 2))             // position the y-centre
        .attr('r', 20)               // set the radius
        .style('stroke-width', 3)    // set the stroke width
        .style('stroke', 'black')      // set the line colour
        .style('fill', position?.color);      // set the fill colour

        holder.append("text")
        .text("F")
        .attr("x", ((distance * i) + (distance / 2)) - 5)
        .attr("y", 305)
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
        .attr('cy', 500)             // position the x-centre
        .attr('cx', (distance * i) + (distance / 2))             // position the y-centre
        .attr('r', 20)               // set the radius
        .style('stroke-width', 3)    // set the stroke width
        .style('stroke', 'black')      // set the line colour
        .style('fill', position?.color);      // set the fill colour

        holder.append("text")
        .text("M")
        .attr("x", ((distance * i) + (distance / 2)) - 7)
        .attr("y", 505)
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
        .attr('cy', 750)             // position the x-centre
        .attr('cx', (distance * i) + (distance / 2))             // position the y-centre
        .attr('r', 20)               // set the radius
        .style('stroke-width', 3)    // set the stroke width
        .style('stroke', 'black')      // set the line colour
        .style('fill', position?.color);      // set the fill colour

        holder.append("text")
        .text("D")
        .attr("x", ((distance * i) + (distance / 2)) - 6)
        .attr("y", 755)
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
    .attr('cy', 920)             // position the x-centre
    .attr('cx', 250)             // position the y-centre
    .attr('r', 20)               // set the radius
    .style('stroke-width', 3)    // set the stroke width
    .style('stroke', 'black')      // set the line colour
    .style('fill', position.color);      // set the fill colour

    holder.append("text")
    .text("K")
    .attr("x", 245)
    .attr("y", 925)
    .attr('fill', 'white');
  }
}
