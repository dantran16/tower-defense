import * as me from 'melonjs';

/* 
 * AttackEffect is a sprite class that is played when an enemy is dead. 
*/
class AttackEffect extends me.Sprite {
    /* 
    * constructor
    * @param {number} x The x position to place the sprite
    * @param {number} y The y position to place the sprite
    */
    constructor(x, y) {
        super(x, y, {
            image: "attack-effect", 
            framewidth: 64, 
            frameheight: 48, 
        });

        this.tint = new me.Color(255,0, 0, 1)

        // Set the animation
        this.addAnimation("attack-effect", [8, 9, 10, 11, 12, 13, 14, 15], 125, false);
        // Run the animation once and remove it
        this.setCurrentAnimation("attack-effect", (function() {
            this.setAnimationFrame(15); 
            me.game.world.removeChild(this); 
        }).bind(this));

    }
}

export default AttackEffect