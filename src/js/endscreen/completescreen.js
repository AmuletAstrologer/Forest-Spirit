import { Scene, Label, Vector, Font, FontUnit, Color, Keys } from "excalibur";
import { Resources } from "../resources.js";
import {Background} from "../background/background.js"

export class CompleteScreen extends Scene {

  onInitialize(engine) {

    const bg = new Background();
    this.add(bg);

    const label = new Label({
        text: "YOU DID IT!",
        pos: new Vector(100, 100),
        font: new Font({
            family: "Arial",
            size: 48,
            unit: FontUnit.Px,
            color: Color.White
        })
    });

    this.add(label);

    const retry = new Label({
        text: "Press SPACE to play again",
        pos: new Vector(100, 200),
        font: new Font({
            size: 24,
            unit: FontUnit.Px,
            color: Color.White
        })
    });

    this.add(retry);
}

    onPreUpdate(engine) {

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            engine.goToScene("level");
        }
    }
}