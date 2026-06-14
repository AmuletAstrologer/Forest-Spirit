import { Scene, Label, Vector, Font, FontUnit, Color, Keys } from "excalibur";
import { Resources } from "../resources.js";
import { Background } from "../background/background.js"

export class StartScreen extends Scene {

    onInitialize(engine) {

        const bg = new Background();
        this.add(bg);

        this.background = Resources.Background.toSprite();
        this.background.destSize = {
            width: engine.drawWidth,
            height: engine.drawHeight
        };
        this.add(this.background);

        // TITLE
        this.title = new Label({
            text: "Forest Spirit",
            pos: new Vector(100, 80),
            font: new Font({
                family: "Arial",
                size: 48,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.add(this.title);

        // OBJECTIVE TEXT
        this.objective = new Label({
            text: "Collect all coins OR defeat all slimes to win!",
            pos: new Vector(100, 160),
            font: new Font({
                family: "Arial",
                size: 24,
                unit: FontUnit.Px,
                color: Color.White
            })
        });
        this.add(this.objective);


        this.play = new Label({
            text: "[ PLAY ] - Press SPACE",
            pos: new Vector(100, 260),
            font: new Font({
                family: "Arial",
                size: 32,
                unit: FontUnit.Px,
                color: Color.Yellow
            })
        });
        this.add(this.play);
    }

    onPreUpdate(engine) {

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene("level");
        }
    }
}