import '../css/style.css'
import { Actor, Engine, Vector, DisplayMode, SolverStrategy } from "excalibur"
import { Resources, ResourceLoader } from './resources.js'
import { Level } from './level/level.js'
import { StartScreen } from './startscreen/startscreen.js'
import { CompleteScreen } from './endscreen/completescreen.js'
import { DefeatScreen } from './endscreen/defeatscreen.js'




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

    onInitialize() {
        const level = new Level();
        const startScreen = new StartScreen();
        const completeScreen = new CompleteScreen();
        const defeatScreen = new DefeatScreen();

        this.add('startscreen', startScreen);
        this.add('level', level); 
        this.add('completescreen', completeScreen);
        this.add('defeatscreen', defeatScreen);

        this.goToScene('startscreen');
    }
 
    startGame() {
        console.log("start de game!")
 
    }


}

new Game()
