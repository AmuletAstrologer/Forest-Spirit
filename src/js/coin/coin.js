import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "../resources.js";

export class Coin extends Actor {

    constructor(x, y) {
        super({
            width: 30,
            height: 30,
            collisionType: CollisionType.Passive
        })

        this.pos = new Vector(x, y)
    }

    onInitialize(engine) {
        this.graphics.use(Resources.Coin.toSprite());
    }
}   