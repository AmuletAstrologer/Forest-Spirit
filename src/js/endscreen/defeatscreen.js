import { Scene, Label, Vector, Font, FontUnit, Color, Keys } from "excalibur";
import { Resources } from "../resources.js";
import { Background } from "../background/background.js"

export class DefeatScreen extends Scene {

    onInitialize(engine) {

        const bg = new Background();
        this.add(bg);

        this.background = Resources.Background.toSprite();
        this.background.destSize = {
            width: engine.drawWidth,
            height: engine.drawHeight
        };
        this.add(this.background);

        this.label = new Label({
            text: "YOU GOT DEFEATED...",
            pos: new Vector(100, 120),
            font: new Font({
                family: "Arial",
                size: 42,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        this.add(this.label);

        this.restart = new Label({
            text: "Press SPACE to try again",
            pos: new Vector(100, 220),
            font: new Font({
                family: "Arial",
                size: 28,
                unit: FontUnit.Px,
                color: Color.White
            })
        });

        this.add(this.restart);
    }

    onPreUpdate(engine) {

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene("level");
        }
    }
}