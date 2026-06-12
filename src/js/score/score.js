import {Color, Font, Label, Vector, FontUnit } from "excalibur";


export class Score extends Label {

    score = 0; 

    constructor (x,y) {
        super();

        this.startX = x;
        this.startY = y;

    }

    onInitialize(engine) {
        this.text = "score: 0";
        this.font = new Font({
            family: "Arial",
            size: 24,
            unit: FontUnit.Px,
            color: Color.White
        })
        this.pos = new Vector(this.startX, this.startY);
    }


    addPoint() {
     this.score++; 
     this.text = `score: ${this.score}`;
    }

    removePoints() {
        this.score--;
        this.text = `score: ${this.score}`;
    }
}