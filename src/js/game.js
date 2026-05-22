import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './background/background.js'    
import { Player } from './player/player.js'
import { Enemy } from './enemy/enemy.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

         const background = new Background()
         this.add(background)

         const player = new Player()
         this.add(player)

         const enemy = new Enemy()
         this.add(enemy)

    }


}

new Game()
