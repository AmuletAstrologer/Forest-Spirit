import { Scene } from "excalibur";
import { Background } from "../background/background.js";
import { Player } from '../player/player.js'
import { Enemy } from '../enemy/enemy.js'
import { Ground } from '../ground/ground.js'
import {Score} from '../score/score.js' 


export class Level extends Scene {

    onInitialize(egine) {
        console.log("Level live!")


        //Arcade kast inputs
        // this.input.gamepads

        const background = new Background()
        this.add(background)

        const score = new Score(100, 100)
        this.add(score)

        const player = new Player(score)
        this.add(player)

        const enemy = new Enemy()
        this.add(enemy)

        const ground = new Ground()
        this.add(ground)

    }
}