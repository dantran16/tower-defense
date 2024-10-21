import * as me from 'melonjs';

class Enemy extends me.Entity {
    constructor(x, y, settings, health, speed, element, reward) {
        // Call parent constructor to initialize the position and settings
        super(x, y, settings);

        // Custom properties for the enemy
        this.health = health;         // Health of the enemy
        this.speed = speed;           // Movement speed of the enemy
        this.element = element;       // Type/Element (e.g., fire, water, etc.)
        this.reward = reward;         // Reward for kill enemy

        // Set the velocity for movement
        this.body.setVelocity(this.speed, this.speed); // Movement speed in x and y directions

        // Disable gravity for the enemy
        this.body.gravity = 0;

        // Define the hitbox 
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));

        // Ensure the enemy is always updated, even when off-screen
        this.alwaysUpdate = true;

        // Make the enemy collidable 
        this.isCollidable = true;
    }

    // Method to update the enemy's movement each frame
    update(dt) {
        // Move the enemy along the x-axis based on its speed and delta time (dt)
        this.pos.x += this.speed * dt / 1000;

        // Update the enemy's body movement and handle collisions
        this.body.update(dt);

        // Return true to signal that the object needs to be re-drawn
        return true;
    }

    // Method to reduce the enemy's health when it takes damage
    takeDamage(damage) {
        this.health -= damage;

        // If the health drops to 0 or below, call the die method
        if (this.health <= 0) {
            this.die();
        }
    }

    // Method to handle enemy death
    die() {
        console.log(`${this.element} enemy has been defeated!`);

        // Remove the enemy from the game world when it dies
        me.game.world.removeChild(this);

        this.rewardPlayer();
    }

    rewardPlayer(){
        me.game.world.getChildbyName('player')[0].coins += this.reward;

        console.log(`Player rewarded with ${this.reward} coins.`)
    }
}

export default Enemy;

// depending on path may need to update movement logic.
// Will need to add enemy comes off screen and "dies"/ disappears
// Need to ask if we have coin tracker.