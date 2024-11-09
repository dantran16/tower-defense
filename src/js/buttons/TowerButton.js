import * as me from "melonjs";
import AllyTasks from "../renderables/allies/AllyTasks";

class TowerButton extends me.UIBaseElement {

    constructor(x, y, name, settings) {
        super(x, y, settings.width, settings.height);
        this.color = "white";
        this.font = new me.Text(0, 0, {font:"Verdana", size:15, fillStyle:"black"});
        this.font.bold();
        this.text = name.toLowerCase();
        this.settings = settings
        this.tasks = new AllyTasks();
    }
    
    // Draw the tower button
    draw(renderer) {
        renderer.setColor(this.color);
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        this.font.draw(renderer, this.text, this.pos.x, this.pos.y);
    }

    // Creates an ally unit on click
    onClick() {
        this.tasks.createChair((me.game.viewport.width * 5 / 6) + this.pos.x, this.pos.y, this.text);
    }

};

export default TowerButton;