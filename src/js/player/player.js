import { Actor, Vector, SpriteSheet, Animation, Keys, CollisionType, DegreeOfFreedom } from "excalibur"
import { Resources } from '../resources.js'
import { Enemy } from "../enemy/enemy.js"

export class Player extends Actor {

    constructor() {
        super({
            width: 67,
            height: 90,
            collisionType: CollisionType.Active
        })
    }

    onInitialize(engine) {

        // Idle sheet
        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerIdle,
            grid: {
                rows: 1,
                columns: 6,
                spriteWidth: 231,
                spriteHeight: 190
            }
        })

        // Run sheet
        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerRun,
            grid: {
                rows: 1,
                columns: 8,
                spriteWidth: 231,
                spriteHeight: 190
            }
        })

        // Jump sheet
        const jumpSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerJump,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 231,
                spriteHeight: 190
            }
        })

        //Fall sheet
        const fallSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerFall,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 231,
                spriteHeight: 190
            }
        })

        // Animations
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

        this.jump = Animation.fromSpriteSheet(
            jumpSheet,
            [0, 1],
            100
        )

        this.fall = Animation.fromSpriteSheet(
            jumpSheet,
            [0, 1],
            100
        )

        // Start with idle
        this.graphics.use(this.idle)

        // Position
        this.pos = new Vector(500, 300)

        // Scale
        this.scale = new Vector(2, 2)

        // Collision
        this.on('collisionstart', (event) => {
            if (event.other.owner instanceof Enemy) {
                event.other.owner.kill()
            }
        })

        // Show hitboxes
        engine.showDebug(true)
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.body.mass = 7;
    }

    onPreUpdate(engine) {


        // let velY = 0



        //Jump
        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.body.applyLinearImpulse(new Vector(0, -3500));
        }

        if (this.vel.y < -100) {
            this.graphics.use(this.jump);
        } else {

            // Movement
            if (engine.input.keyboard.isHeld(Keys.Right)) {
                this.body.applyLinearImpulse(new Vector(150, 0));
                this.graphics.flipHorizontal = false
            }

            if (engine.input.keyboard.isHeld(Keys.Left)) {
                this.body.applyLinearImpulse(new Vector(-150, 0));
                this.graphics.flipHorizontal = true
            }

            if (Math.abs(this.vel.x) > 5) {
                this.graphics.use(this.run);
            } else {
                this.graphics.use(this.idle);
            }
        }

        // else if (velX !== 0) {
        //     this.graphics.use(this.run)
        // }

        // else {
        //     this.graphics.use(this.idle)
        // }


    }
}