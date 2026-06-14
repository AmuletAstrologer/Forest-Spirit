import { Scene, Vector } from "excalibur";
import { Background } from "../background/background.js"
import { Player } from '../player/player.js'
import { HeartUI } from '../player/heartui.js'
import { Coin } from '../coin/coin.js'
import { Enemy } from '../enemy/enemy.js'
import { Ground } from '../ground/ground.js'
import { Platform } from "../ground/platform.js"
// import { Score } from '../score/score.js'
import { ObjectiveUI } from "../objectiveui/objectiveui.js"

export class Level extends Scene {

    totalCoins = 0;
    totalEnemies = 0;

    onInitialize(engine) {
        console.log("Level initialized once");

    }

    onActivate(ctx) {
        console.log("Level reset!");
        const engine = ctx.engine;

        // IMPORTANT: wipe old actors
        this.clear();

        this.totalCoins = 0;
        this.totalEnemies = 0;

        const background = new Background();
        this.add(background);

        // const score = new Score(100, 100);
        // this.add(score);

        const player = new Player();
        this.add(player);

        const objectiveUI = new ObjectiveUI(player);
        this.add(objectiveUI);

        const heartUI = new HeartUI(player);
        this.add(heartUI);

        this.totalCoins = 5;

        for (let i = 0; i < 5; i++) {

            const x = Math.random() * engine.drawWidth;
            const y = 100 + Math.random() * 200;

            const coin = new Coin(x, y);
            this.add(coin);
        } 

        this.totalEnemies = 5;

        const spawnZones = [
            { x: 100, y: 300 },
            { x: 350, y: 300 },
            { x: 600, y: 250 },
            { x: 850, y: 300 },
            { x: 1100, y: 250 }
        ];

        this.enemies = [];

        for (let i = 0; i < 5; i++) {
            const enemy = new Enemy();

            enemy.pos.setTo(
                spawnZones[i].x,
                spawnZones[i].y
            );

            this.enemies.push(enemy);
            this.add(enemy);
        }


        const ground = new Ground();
        this.add(ground);

        const platform1 = new Platform(50, 300, 150)
        this.add(platform1)

        const platform2 = new Platform(350, 495, 300)
        this.add(platform2)

        const platform3 = new Platform(800, 350, 250)
        this.add(platform3)

        const platform4 = new Platform(1050, 500, 150)
        this.add(platform4)

        const platform5 = new Platform(1200, 250, 150)
        platform5.name = "goal"
        this.add(platform5)
    }

    getRandomX(engine) {
        return Math.random() * engine.drawWidth;
    }

    getRandomY(engine, min = 100, max = 500) {
        return min + Math.random() * (max - min);
    }
}