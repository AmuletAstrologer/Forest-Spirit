import { Actor, Vector, CollisionType } from "excalibur"
import { Resources } from "../resources"

export class Platform extends Actor {

    constructor(x, y, width) {
        super({
            width: width,
            height: 50,
            collisionType: CollisionType.Fixed
        })

        this.pos = new Vector(x, y)
    }

    onInitialize(engine) {

        const sprite = Resources.Platform.toSprite()
    
        sprite.scale.x = this.width / sprite.width

        this.graphics.use(sprite)
    }
}