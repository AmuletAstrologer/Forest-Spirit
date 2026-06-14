import { ScreenElement, Vector } from "excalibur";
import { Resources } from "../resources.js";

export class HeartUI extends ScreenElement {

    constructor(player) {
        super({ x: 10, y: 10 });

        this.player = player;

        this.hearts = [];

        this.maxHealth = 3;

    }

    onInitialize(engine) {

        for (let i = 0; i < this.maxHealth; i++) {

            const heart = new ScreenElement({
                x: i * 40,
                y: 0
            });

            const sprite = Resources.Heart.toSprite();
            sprite.destSize = { width: 32, height: 32 };

            heart.graphics.use(sprite);

            this.addChild(heart);

            this.hearts.push(heart);
        }
    }

    onPostUpdate(engine) {

        const hp = this.player.health;

        for (let i = 0; i < this.hearts.length; i++) {
            this.hearts[i].graphics.opacity = i < hp ? 1 : 0;
        }
    }
}