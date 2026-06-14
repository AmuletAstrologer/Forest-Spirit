import { ScreenElement, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class Heart extends ScreenElement {

    constructor() {
        super({ x: 10, y: 10 });

        this.maxHealth = 3;
        this.health = 3;

        this.hearts = [];

        for (let i = 0; i < this.maxHealth; i++) {
            const sprite = Resources.Heart.toSprite();

            sprite.destSize = { width: 32, height: 32 };
            sprite.offset = new Vector(i * 40, 0); 

            this.hearts.push(sprite);
            this.graphics.add(sprite);
        }
    }

    adjustHealth() {
        this.health--;

        if (this.health < 0) this.health = 0;

        this.updateHearts();
    }

    updateHearts() {
        for (let i = 0; i < this.hearts.length; i++) {

            if (i < this.health) {
                this.hearts[i].opacity = 1; 
            } else {
                this.hearts[i].opacity = 0; 
            }
        }
    }
}