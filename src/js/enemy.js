import * as me from 'melonjs';

class Enemy extends me.Entity {
    constructor(x, y, settings, health, speed, element) {
        // Call parent constructor to initialize the position and settings
        super(x, y, settings);

        // Custom properties for the enemy
        this.health = health;         // Health of the enemy
        this.speed = speed;           // Movement speed of the enemy
        this.element = element;       // Type/Element (e.g., fire, water, etc.)

        // Set the velocity for movement
        this.body.setVelocity(this.speed, this.speed); // Movement speed in x and y directions

        // Disable gravity for the enemy (since it's not needed in a tower defense game)
        this.body.gravity = 0;

        // Define the hitbox (adjust based on sprite size)
        this.body.addShape(new me.Rect(0, 0, this.width, this.height));

        // Ensure the enemy is always updated, even when off-screen
        this.alwaysUpdate = true;

        // Make the enemy collidable (for interaction with other objects)
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
    }
}

export default Enemy;
