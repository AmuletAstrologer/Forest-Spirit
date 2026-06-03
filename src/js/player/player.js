import { Actor, Vector, SpriteSheet, Animation, Keys, CollisionType, DegreeOfFreedom, AnimationStrategy } from "excalibur"
import { Resources } from '../resources.js'
import { Enemy } from "../enemy/enemy.js"

export class Player extends Actor {

    //Basic State Contoller
    isAttacking = false;
    isHit = false;
    isDead = false;

    constructor() {
        super({
            width: 67,
            height: 90,
            collisionType: CollisionType.Active
        })

        this.isGrounded = false
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

        // Fall sheet
        const fallSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerFall,
            grid: {
                rows: 1,
                columns: 2,
                spriteWidth: 231,
                spriteHeight: 190
            }
        })

        // Attack1 sheet
        const attack1Sheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerAttack1,
            grid: {
                rows: 1,
                columns: 8,
                spriteWidth: 231,
                spriteHeight: 190

            }
        })

        // Attack2 sheet
        const attack2Sheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerAttack2,
            grid: {
                rows: 1,
                columns: 8,
                spriteWidth: 231,
                spriteHeight: 190

            }
        })

        // Hit sheet
        const hitSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerHit,
            grid: {
                rows: 1,
                columns: 4,
                spriteWidth: 231,
                spriteHeight: 190
            }
        })

        // Death sheet
        const deathSheet = SpriteSheet.fromImageSource({
            image: Resources.PlayerDeath,
            grid: {
                rows: 1,
                columns: 7,
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
            fallSheet,
            [0, 1],
            100
        )

        this.attack1 = Animation.fromSpriteSheet(
            attack1Sheet,
            [0, 1, 2, 3, 4, 5, 6, 7],
            100, AnimationStrategy.End

        )

        this.attack1.events.on("end", () => {
            this.isAttacking = false;
            this.attack1.reset();
        })

        this.attack2 = Animation.fromSpriteSheet(
            attack2Sheet,
            [0, 1, 2, 3, 4, 5, 6, 7],
            100, AnimationStrategy.End

        )

        this.attack2.events.on("end", () => {
            this.isAttacking = false;
            this.attack2.reset();
        })

        this.hit = Animation.fromSpriteSheet(
            hitSheet,
            [0, 1, 2, 3],
            100,
            AnimationStrategy.End
        )

        this.hit.events.on("end", () => {
            this.isHit = false;
            this.hit.reset();
        })

        this.death = Animation.fromSpriteSheet(
            deathSheet,
            [0, 1, 2, 3, 4, 5, 6],
            100,
            AnimationStrategy.End
        )

        this.death.events.on("end", () => {
            this.isDead = false;
            this.death.reset();
        })


        // Start with idle
        this.graphics.use(this.idle)

        // Position
        this.pos = new Vector(500, 300)

        // Scale
        this.scale = new Vector(2, 2)

        // Collision
        this.on('collisionstart', (event) => {

            this.isGrounded = true

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

        // Jump
        if (
            engine.input.keyboard.wasPressed(Keys.Space) &&
            this.isGrounded
        ) {
            this.body.applyLinearImpulse(
                new Vector(0, -3500)
            )

            this.isGrounded = false
        }

        // Horizontal movement
        if (engine.input.keyboard.isHeld(Keys.Right)) {

            if (this.vel.x < 200) {
                this.body.applyLinearImpulse(
                    new Vector(150, 0)
                )
            }

            this.graphics.flipHorizontal = false
        }

        if (engine.input.keyboard.isHeld(Keys.Left)) {

            if (this.vel.x > -200) {
                this.body.applyLinearImpulse(
                    new Vector(-150, 0)
                )
            }

            this.graphics.flipHorizontal = true
        }


        // Animations

        if (this.isDead) {
            this.graphics.use(this.death)
            return
        }

        if (this.isHit) {
            this.graphics.use(this.hit)
            return
        }

        if (!this.isAttacking) {

            if (this.vel.y < -50) {

                this.graphics.use(this.jump)

            } else if (this.vel.y > 50) {

                this.graphics.use(this.fall)

            } else if (Math.abs(this.vel.x) > 5) {

                this.graphics.use(this.run)

            } else {

                this.graphics.use(this.idle)
            }
        }

        //Attacks 

        if (engine.input.keyboard.wasPressed(Keys.Q)) {

            this.isAttacking = true
            this.graphics.use(this.attack1)

        }


        if (engine.input.keyboard.wasPressed(Keys.W)) {
            this.isAttacking = true
            this.graphics.use(this.attack2)

        }


        //Temprary

        if (engine.input.keyboard.wasPressed(Keys.H)) {
            this.isHit = true
            this.graphics.use(this.hit)
        }

        if (engine.input.keyboard.wasPressed(Keys.G)) {
            this.isDead = true
            this.graphics.use(this.death)

        }

    }






}


