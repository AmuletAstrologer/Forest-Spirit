import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Background } from './background/background.js'    
import { Player } from './player/player.js'
import { Enemy } from './enemy/enemy.js'
import { Ground } from './ground/ground.js'

export class Game extends Engine {

    constructor() {
        super({
            width: 1280,
            height: 720,
            maxFps: 60,
            displayMode: DisplayMode.FitScreen,
            suppressPlayButton: true, 
                physics: {
                    solver: SolverStrategy.Realistic,
                    gravity: new Vector(0, 800),
                }
        })
        this.start(ResourceLoader).then(() => this.startGame())
    }

    startGame() {
        console.log("start de game!")

        //Arcade kast inputs
        // this.input.gamepads

         const background = new Background()
         this.add(background)

         const player = new Player()
         this.add(player)

         const enemy = new Enemy()
         this.add(enemy)

         const ground = new Ground()
         this.add(ground)
    }


}

new Game()
