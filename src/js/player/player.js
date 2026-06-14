import { Actor, Vector, SpriteSheet, Shape, Animation, Keys, CollisionType, DegreeOfFreedom, AnimationStrategy } from "excalibur"
import { Resources } from '../resources.js'
import { CompleteScreen } from "../endscreen/completescreen.js"
import { DefeatScreen } from "../endscreen/defeatscreen.js"
import { Enemy } from "../enemy/enemy.js"
import { Coin } from "../coin/coin.js"

export class Player extends Actor {
    score;

    //Basic State Contoller
    health = 3;
    coins = 0;
    enemiesKilled = 0;

    isAttacking = false;
    isHit = false;
    isDead = false;
    canDamage = false;

    constructor(score) {
        super({
            width: 35,
            height: 90,
            collisionType: CollisionType.Active
        })

        this.score = score;
        this.isGrounded = false
        this.invincible = false;
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
            this.canDamage = false;
            this.attack1.reset();
        })

        this.attack2 = Animation.fromSpriteSheet(
            attack2Sheet,
            [0, 1, 2, 3, 4, 5, 6, 7],
            100, AnimationStrategy.End

        )

        this.attack2.events.on("end", () => {
            this.isAttacking = false;
            this.canDamage = false;
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
            this.hit.reset();
        })


        // Start with idle
        this.graphics.use(this.idle)

        // Position
        this.pos = new Vector(50, 200)
        this.graphics.offset = new Vector(6, 0)

        // Scale
        this.scale = new Vector(1, 1)

        // Collision
        this.on('collisionstart', (event) => {

            this.isGrounded = true


            const other = event.other.owner;

            if (
                event.other.owner instanceof Enemy &&
                this.canDamage
            ) {
                event.other.owner.kill();
                this.score.addPoint();

                this.canDamage = false;
            }

            if (other instanceof Coin) {
                other.kill();
                this.coins++;

                console.log(
                    `Coins: ${this.coins}/${this.scene.totalCoins}`
                );
            }

            if (other.name === "goal") {

                const allCoins =
                    this.coins >= this.scene.totalCoins;

                const allSlimes =
                    this.enemiesKilled >= this.scene.totalEnemies;

                if (allCoins || allSlimes) {

                    engine.goToScene("completescreen");

                } else {

                    console.log(
                        "Collect all coins OR defeat all slimes!"
                    );
                }
            }
        })


        // Show hitboxes
        engine.showDebug(true)
        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.body.mass = 7;
    }



    onPreUpdate(engine) {

        const width = engine.drawWidth;
        const height = engine.drawHeight;

        if (this.pos.x < 0) this.pos.x = 0;
        if (this.pos.x > width) this.pos.x = width;

        if (this.pos.y < 0) this.pos.y = 0;
        if (this.pos.y > height) this.pos.y = height;
        
        // Jump
        if (
            engine.input.keyboard.wasPressed(Keys.Space) &&
            this.isGrounded
        ) {
            this.body.applyLinearImpulse(
                new Vector(0, -4000)
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
            this.vel = new Vector(0, 0);
            this.body.collisionType = CollisionType.Passive;
            return;
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

            setTimeout(() => {

                const enemies = engine.currentScene.actors.filter(
                    actor => actor instanceof Enemy
                )

                for (let enemy of enemies) {

                    const distance = this.pos.distance(enemy.pos)

                    if (distance < 150) {
                        enemy.kill();

                        this.enemiesKilled++;

                        // this.score.addPoint();

                        console.log(
                            `Slimes: ${this.enemiesKilled}/${this.scene.totalEnemies}`
                        );
                    }
                }

            }, 400)
        }

        if (engine.input.keyboard.wasPressed(Keys.W)) {

            this.isAttacking = true
            this.graphics.use(this.attack2)

            setTimeout(() => {

                const enemies = engine.currentScene.actors.filter(
                    actor => actor instanceof Enemy
                )

                for (let enemy of enemies) {

                    const distance = this.pos.distance(enemy.pos)

                    if (distance < 150) {
                        enemy.kill();

                        this.enemiesKilled++;

                        // this.score.addPoint();

                        console.log(
                            `Slimes: ${this.enemiesKilled}/${this.scene.totalEnemies}`
                        );
                    }
                }

            }, 400)

        }


        //Death 
        // if (this.heart <= 0)
        // {
        //     engine.goToScene("defeatscreen")
        // }


        //Temprary

        // if (engine.input.keyboard.wasPressed(Keys.H)) {
        //     this.isHit = true
        //     this.graphics.use(this.hit)
        // }

        if (engine.input.keyboard.wasPressed(Keys.G)) {
            this.isDead = true
            this.graphics.use(this.death)

        }

    }

    takeDamage() {

        if (this.isDead) return;
        if (this.invincible) return;

        this.invincible = true;
        this.health--;

        console.log("Player took damage! Current health: " + this.health);


        if (this.health <= 0) {

            this.isDead = true;
            this.invincible = true;

            // stop ALL movement immediately
            this.vel = new Vector(0, 0);
            this.actions.clearActions();

            // force death animation ONCE
            this.graphics.use(this.death);

            // prevent any other logic overriding animation
            this.isAttacking = false;
            this.isHit = false;

            // ⏳ delay scene change
            setTimeout(() => {
                this.scene.engine.goToScene("defeatscreen");
            }, 1200);

            return;
        }


        this.isHit = true;
        this.graphics.use(this.hit);

        setTimeout(() => {
            this.isHit = false;
        }, 300);

        let flashes = 0;
        const flashInterval = setInterval(() => {

            this.graphics.opacity =
                this.graphics.opacity === 1 ? 0.3 : 1;

            flashes++;

            if (flashes > 10) {

                clearInterval(flashInterval);
                this.graphics.opacity = 1;

                if (!this.isDead) {
                    this.invincible = false;
                }
            }

        }, 150);
    }






}


