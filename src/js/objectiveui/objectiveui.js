import { ScreenElement, Label, Vector, Font, Color } from "excalibur";

export class ObjectiveUI extends ScreenElement {

    constructor(player) {
        super();

        this.player = player;

        this.label = new Label({
            text: "Loading...",
            pos: new Vector(10, 50),
            font: new Font({
                size: 24
            })
        });

        this.label.color = Color.White;

        this.addChild(this.label);
    }

    onPostUpdate() {

        if (!this.player || !this.player.scene) return;

        this.label.text =
            `Coins: ${this.player.coins}/${this.player.scene.totalCoins}\n` +
            `Slimes: ${this.player.enemiesKilled}/${this.player.scene.totalEnemies}`;
    }
}