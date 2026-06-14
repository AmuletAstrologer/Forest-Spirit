import { Actor, Vector, SpriteSheet, Animation, CollisionType, DegreeOfFreedom, AnimationStrategy } from "excalibur";
import { Resources } from '../resources.js'
import { Player } from "../player/player.js";

export class Enemy extends Actor {

    player;
    attackCooldown = 0;

    speed = 40;
    direction = 1;
    range = 80;
    startX = 0;

    constructor() {
        super({
            width: 25,
            height: 30,
            collisionType: CollisionType.Active
        });
    }

    onInitialize(engine) {

        const idleSheet = SpriteSheet.fromImageSource({
            image: Resources.EnemyIdle,
            grid: { rows: 1, columns: 4, spriteWidth: 64, spriteHeight: 64 }
        });

        const runSheet = SpriteSheet.fromImageSource({
            image: Resources.EnemyRun,
            grid: { rows: 1, columns: 4, spriteWidth: 64, spriteHeight: 64 }
        });

        const jumpSheet = SpriteSheet.fromImageSource({
            image: Resources.EnemyJump,
            grid: { rows: 2, columns: 4, spriteWidth: 64, spriteHeight: 64 }
        });

        const jumpEffectSheet = SpriteSheet.fromImageSource({
            image: Resources.EnemyJumpEffect,
            grid: { rows: 3, columns: 3, spriteWidth: 64, spriteHeight: 64 }
        });

        this.idle = Animation.fromSpriteSheet(idleSheet, [0, 1, 2, 3], 200);
        this.run = Animation.fromSpriteSheet(runSheet, [0, 1, 2, 3], 120);
        this.jump = Animation.fromSpriteSheet(jumpSheet, [0, 1, 2, 3, 4, 5, 6, 7], 120, AnimationStrategy.End);
        this.jumpEffect = Animation.fromSpriteSheet(jumpEffectSheet, [0, 1, 2, 3, 4, 5, 6, 7], 80, AnimationStrategy.End);

        this.graphics.use(this.idle);

    
        this.scale = new Vector(2, 2);


        this.on("collisionstart", (event) => {
            if (event.other.owner instanceof Player) {
                event.other.owner.takeDamage();
            }
        });

        this.on('collisionstart', (event) => {
            const other = event.other.owner;

            if (other instanceof Enemy) {
                this.direction *= -1;
                other.direction *= -1;
            }
        });

        this.body.limitDegreeOfFreedom.push(DegreeOfFreedom.Rotation);
        this.body.mass = 3;

        this.startX = this.pos.x;
    }

    spawnEffect() {
        this.graphics.add(this.jumpEffect);

        this.jumpEffect.reset();

        setTimeout(() => {
            this.graphics.remove(this.jumpEffect);
        }, 600);
    }

    onPreUpdate(engine, delta) {

    if (!this.player) {
        this.player = engine.currentScene.actors.find(a => a instanceof Player);
        if (!this.player) return;
    }

    const dist = this.player.pos.distance(this.pos);

    let targetSpeed = 0;

    // cooldown
    if (this.attackCooldown > 0) {
        this.attackCooldown -= delta;
    }

    // ATTACK
    if (dist < 60 && this.attackCooldown <= 0) {

        this.vel.x = 0;
        this.graphics.use(this.jump);

        this.spawnEffect();

        this.attackCooldown = 1000;
        return;
    }

    // CHASE
    if (dist < 200) {
        this.graphics.use(this.run);

        targetSpeed = this.player.pos.x > this.pos.x ? 50 : -50;
    }

    // PATROL
    else {
        if (this.pos.x > this.startX + this.range) this.direction = -1;
        if (this.pos.x < this.startX - this.range) this.direction = 1;

        targetSpeed = this.speed * this.direction;
        this.graphics.use(this.idle);
    }

    this.vel.x = targetSpeed;
}

}