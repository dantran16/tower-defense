import * as me from 'melonjs';
import GoldCoin from '../misc/GoldCoin';
import PauseButton from '../../buttons/PauseButton';
import WaveButton from '../../buttons/WaveButton';
import SoundButton from '../../buttons/SoundButton';
import applicationState from '../../applicationState';
import { state } from "melonjs";

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
        this.level = applicationState.data.level
        this.coin = new GoldCoin(this.width * 21 / 24 + this.calculateGoinCoinOffset(), this.height / 12 + 9);
        this.currencyText = applicationState.data.currency    

        this.addChild(new WaveButton(this.width / 0.98, this.height / 15))
        this.addChild(new PauseButton(this.width / 0.9, this.height / 15))
        this.addChild(new SoundButton(this.width / 0.91, this.height / 10))

        this.lives = new me.Text(this.width * 22 / 24, this.height / 24, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "right",
            textBaseline: "top",
            bold: true,
            text: `Lives: ${applicationState.data.playerHealth}`
        })

        this.currency = new me.Text(this.width * 22 / 24, this.height / 12, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "right",
            textBaseline: "top",
            bold: true,
            text: `${applicationState.data.currency}`
        })

        this.waves = new me.Text(this.width / 24, this.height / 24, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Wave:`
        })

        this.enemies = new me.Text(this.width / 24, this.height / 12, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Enemies Left: ${applicationState.data.enemies}`
        })

        this.levels = new me.Text(this.width / 24, this.height / 8, {
            font: "PressStart2P",
            size: 20,
            fillStyle: "white",
            textAlign: "left",
            textBaseline: "top",
            bold: true,
            text: `Level: ${applicationState.data.level}`
        })
        this.addChild(this.lives);
        this.addChild(this.waves);
        this.addChild(this.enemies);
        this.addChild(this.coin);
        this.addChild(this.currency);
        this.addChild(this.levels);
    }

    update(dt) {
        this.isDirty = false
        if (this.life !== applicationState.data.playerHealth) {
            this.life = applicationState.data.playerHealth;
            this.lives.setText(`Lives: ${applicationState.data.playerHealth}`);
            this.isDirty = true;
            // Display game over screen if player health reaches 0
            if (applicationState.data.playerHealth <= 0) {
                state.change(state.GAMEOVER);
            }
        }
        if (this.currencyText !== applicationState.data.currency) {
            this.currencyText = applicationState.data.currency;
            this.currency.setText(`${applicationState.data.currency}`);
            this.removeChild(this.coin);
            let offset = this.calculateGoinCoinOffset()
            this.coin = new GoldCoin(this.width * 21 / 24 + offset, this.height / 12 + 9);
            this.addChild(this.coin)
            this.isDirty = true;
        }
        if (this.wave !== applicationState.data.wave) {
            this.wave = applicationState.data.wave;
            this.waves.setText(`Wave: ${applicationState.data.wave}`);
            this.isDirty = true;
        }

        if (this.enemy !== applicationState.data.enemies) {
            this.enemy = applicationState.data.enemies;
            this.enemies.setText(`Enemies Left: ${applicationState.data.enemies}`);
            this.isDirty = true;
            // Display winning screen if enemy count reaches 0
            if (applicationState.data.enemies == 0 && applicationState.data.playerHealth > 0 && applicationState.data.level >= 3 && applicationState.data.wave >= 30) {
                state.change(state.GAME_END)
            }
        }

        if (this.level !== applicationState.data.level) {
            this.level = applicationState.data.level;
            this.levels.setText(`Level: ${applicationState.data.level}`);
            this.isDirty = true;
        }

        
        return super.update(dt);
    }

    calculateGoinCoinOffset(){
        return -10 * (applicationState.data.currency.toString().length - 2) + 15
    }
};
export default GameHUD;