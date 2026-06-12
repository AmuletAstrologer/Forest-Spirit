  import { Engine, Scene, Label, Vector, Font, FontUnit, Color } from "excalibur";

export class StartScreen extends Scene {

    onInitialize(engine) {

        this.label = new Label({
            text: "Start the game!",
            pos: new Vector(100, 100),
            font: new Font({
                family: "Arial",
                size: 48,
                unit: FontUnit.Px,
                color: Color.Black
            })
        });

        this.add(this.label);
        this.onActivate(context); 
    }

    onPreUpdate(engine, elapsed) {

        if (engine.input.keyboard.wasPressed(Input.Keys.Space)) {
            engine.goToScene('level');
        }
    }
}