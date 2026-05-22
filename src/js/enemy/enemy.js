import { Actor, Vector, SpriteSheet, Animation } from "excalibur";
import { Resources } from '../resources.js'

export class Enemy extends Actor {

    constructor() {
        super({
            width: 30,
            height: 30
        })
    }

    onInitialize(engine) {

        // sprite
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.EnemyIdle,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 64,
                spriteHeight: 64
            }
        })

        this.idle = Animation.fromSpriteSheet(
            idleSheet,
            [0, 1, 2, 3],
            200
        )

        this.graphics.use(this.idle)

         // position
        this.pos = new Vector(600, 300)

        // size
        this.scale = new Vector(2, 2)


         engine.showDebug(true)

    }
}