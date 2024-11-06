import * as me from 'melonjs';
import applicationState from '../../applicationState';

// a Panel type container
class GameHUD extends me.UIBaseElement {

    constructor(x, y, width, height) {
        // call the constructor
        super(x, y, width, height);

        // [0, 0] as origin
        this.anchorPoint.set(0, 0);

        // give a name
        this.name = "GameHUD";

        this.life = applicationState.data.playerHealth
        this.wave = applicationState.data.wave
        this.enemy = applicationState.data.enemies

        this.lives = new me.Text(this.width / 24, this.height / 24, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Lives: ${applicationState.data.playerHealth}`
        })

        this.waves = new me.Text(this.width * 22 / 24, this.height / 24, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Wave: ${applicationState.data.wave}`
        })

        this.enemies = new me.Text(this.width * 27/32, this.height / 12, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Enemies Left: ${applicationState.data.enemies}`
        })
        this.addChild(this.lives);
        this.addChild(this.waves);
        this.addChild(this.enemies);
    }

    update(dt) {
        this.isDirty = false
        if (this.life !== applicationState.data.playerHealth) {
            this.life = applicationState.data.playerHealth;
            this.lives.setText(`Lives: ${applicationState.data.playerHealth}`);
            this.isDirty = true;
        }
        if (this.wave !== applicationState.data.wave) {
            this.wave = applicationState.data.wave;
            this.waves.setText(`Lives: ${applicationState.data.wave}`);
            this.isDirty = true;
        }
        if (this.enemy !== applicationState.data.enemies) {
            this.enemy = applicationState.data.enemies;
            this.enemies.setText(`Lives: ${applicationState.data.enemies}`);
            this.isDirty = true;
        }
        return super.update(dt);
    }
};
export default GameHUD;