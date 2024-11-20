import * as me from "melonjs";
import AllyTasks from "../renderables/allies/allytasks";
import { params } from "../params";
import applicationState from "../applicationState";

class TowerButton extends me.UIBaseElement {

    constructor(x, y, name, settings) {
        super(x, y, settings.width, settings.height);
        this.setSprite(name.toLowerCase());

        this.color = "white";
        this.font = new me.Text(0, 0, {font:"PressStart2P", size: 14, fillStyle:"black"});
        this.font.bold();
        this.text = `${name} - $${params.towerCost[name.toLowerCase()]}`
        this.name = name.toLowerCase()
        this.settings = settings
        this.tasks = new AllyTasks();
    }
    
    // Draw the tower button
    draw(renderer) {
        renderer.setColor(this.color);
        renderer.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        this.font.draw(renderer, this.text, this.pos.x + 5, this.pos.y + 65);
        this.sprite.draw(renderer, this.pos.x, this.pos.y)
    }

    // Creates an ally unit on click
    onClick() {
        if (!applicationState.creation) {
            this.tasks.createChair((me.game.viewport.width * 5 / 6) + this.pos.x, this.pos.y, this.name);
        }
    }

    update(dt){
        this.sprite.update(dt)
        return true
    }

    setSprite(name){
        this.spriteImage = me.loader.getImage(name)
        this.sprite = new me.Sprite(this.pos.x + 25, this.pos.y - 5, {
            image: this.spriteImage,
            framewidth: 32,
            frameheight: 64
        })
        if(name == 'child'){
            this.sprite.addAnimation("right_sit", [24,25,26,27,28,29]);
            this.sprite.setCurrentAnimation("right_sit");
        } else if(name =='adult'){
            this.sprite.addAnimation("right_sit", [0,1,2,3,4,5]);
            this.sprite.setCurrentAnimation("right_sit");
        } 
        else if(name == 'foodie'){
            this.sprite.addAnimation("right_sit", [0,1,2,3,4,5]);
            this.sprite.setCurrentAnimation("right_sit");
        }
    }
};

export default TowerButton;