import { Actor, Vector, CollisionType, Rectangle, Color } from "excalibur"
import { Resources } from "../resources"

export class Ground extends Actor {

    constructor() {
        super({
            width: 1280,
            height: 50,
            collisionType: CollisionType.Fixed
        })
    }

    onInitialize(engine) {

        this.pos = new Vector(640, 690)

        const sprite = Resources.Platform.toSprite()

        sprite.scale.x = this.width / sprite.width

        this.graphics.use(sprite)
        // this.graphics.use(
        //     new Rectangle({
        //         width: this.width,
        //         height: this.height,
        //         color: Color.Green
        //     })
        // )
    }
}