import { Actor, Vector, SpriteSheet, Animation, Keys } from "excalibur"
import { Resources } from '../resources.js'
import { Enemy } from "../enemy/enemy.js"

export class Player extends Actor {

    constructor() {
        super({
            width: 67,
            height: 90
        })
    }

    onInitialize(engine) {

        // sprite
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerIdle,
            grid: {
                rows: 1,
                columns: 6,
                spriteWidth: 231,
                spriteHeight: 190
            }
        })

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerRun,
            grid: {
                rows: 1,
                columns: 8,
                spriteWidth: 231,
                spriteHeight: 190
            }
        })


        this.idle = Animation.fromSpriteSheet(
            idleSheet,
            [0, 1, 2, 3, 4, 5],
            200
        )


        this.run = Animation.fromSpriteSheet(
            runSheet,
            [0, 1, 2, 3, 4, 5, 6, 7],
            100
        )

        // position
        this.pos = new Vector(500, 300)

        // size
        this.scale = new Vector(2, 2)

        this.on('collisionstart', (event) => {
            if (event.other.owner instanceof Enemy) {
                event.other.owner.kill()
            }
        })

        engine.showDebug(true)
    }


    onPreUpdate(engine) {
        let velX = 0;


        if (engine.input.keyboard.isHeld(Keys.Right)) {
            velX = 200
            this.graphics.flipHorizontal = false
            this.graphics.use(this.run)
        }

        if (engine.input.keyboard.isHeld(Keys.Left)) {
            velX = -200
            this.graphics.flipHorizontal = true
            this.graphics.use(this.run)
        }

        if (velX === 0) {
            this.graphics.use(this.idle)
        }


        this.vel = new Vector(velX, 0)
    }

}