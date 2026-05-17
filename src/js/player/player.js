import { Actor, Vector, SpriteSheet, Animation, Keys } from "excalibur"
import { Resources } from '../resources.js'

export class Player extends Actor {

    constructor() {
        super()
    }

    onInitialize(engine) {

        // sprite
        const sheet = SpriteSheet.fromImageSource({
            image: Resources.Player,
            grid: {
                rows: 1,
                columns: 6,
                spriteWidth: 231,
                spriteHeight: 190
            }
        })

        const idle = Animation.fromSpriteSheet(
            sheet,
            [0, 1, 2, 3, 4, 5],
            200
        )

        this.graphics.use(idle)

        // position
        this.pos = new Vector(500, 300)

        // size
        this.scale = new Vector(2, 2)
    }

    onPreUpdate(engine) {

    if (engine.input.keyboard.isHeld(Keys.Left)) {
        this.vel.x = -200
    }


    else if (engine.input.keyboard.isHeld(Keys.Right)) {
        this.vel.x = 200
    }


    else {
        this.vel.x = 0
    }
}

}