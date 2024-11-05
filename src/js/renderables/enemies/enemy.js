import * as me from 'melonjs';
import applicationState from '../../applicationState';
import waypoints from './waypoint.js';

class Enemy extends me.Entity {
    constructor(x, y, settings) {
        // Call parent constructor to initialize the position and settings
        super(x, y, settings);

        // Initialize properties for enemy unit
        this.health = 0;    // Health of the enemy
        this.speed = 0;     // Movement speed of the enemy
        this.reward = 0;    // Reward for kill enemy
        
        this.body.gravity = 0;     // Remove gravity
        this.alwaysUpdate = false;   // Always update even off-screen
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;      // Acts as enemy object
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);   // Can only collide with player objects
        this.body.addShape(new me.Ellipse(0, 0, 25, 25));               // Hitbox assumes the shape of a circle

        this.pathWaypoints = waypoints;
        this.waypointIndex = 0;

        if (this.pathWaypoints.length > 0) {
            this.pos.set(this.pathWaypoints[0].x, this.pathWaypoints[0].y);
        }

        this.startMovement();
    }

    startMovement() {
        this.moveInternal = setInterval(() => {
            this.moveToWaypoint();
        }, 16);
    }

    // Return enemy stats
    getEnemyStats() {
        return{
            health: this.health,
            speed: this.speed,
            reward: this.reward
        }
    }

    //Update the enemy's movement each frame
    update(dt) {
        if(applicationState.isPaused){
            this.body.setMaxVelocity(0, 0); // Movement speed in x and y directions
            return true
        } 
        this.body.setMaxVelocity(this.speed, this.speed)
        if (this.waypoints && this.currentWaypoint < this.waypoints.length) {
            this.moveToWaypoint(dt);
        } else {
            this.onCollideWithTrashCan();
            console.log("Enemy reached the end of its path or no waypoints available.");
        }
        
        this.body.update(dt);
    }
    


    moveToWaypoint(dt = 16) {
        if (this.waypointIndex >= this.pathWaypoints.length) {
            console.error(`Invalid waypoint index: ${this.waypointIndex}. Waypoint index is out of bounds.`);
            this.onCollideWithTrashCan();
            return;
        }

        const waypoint = this.pathWaypoints[this.waypointIndex];
        
        if (!waypoint) {
            console.error(`Waypoint at index ${this.waypointIndex} is undefined.`);
            return;
        }

        const yDistance = waypoint.y - (this.pos.y + this.height / 2);
        const xDistance = waypoint.x - (this.pos.x + this.width / 2);
        const angle = Math.atan2(yDistance, xDistance);
        const speed = 100;

        this.velocity = {
            x: Math.cos(angle) * speed * (dt / 1000),
            y: Math.sin(angle) * speed * (dt / 1000)
        };

        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        this.center = {
            x: this.pos.x + this.width / 2,
            y: this.pos.y + this.height / 2
        };

        console.log(`Current position: (${this.center.x.toFixed(2)}, ${this.center.y.toFixed(2)}), Target: (${waypoint.x}, ${waypoint.y}), Distance: ${Math.hypot(xDistance, yDistance).toFixed(2)}, Waypoint Index: ${this.waypointIndex}`);
        if (
            Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
            Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y)
        ) {
            // Move to the next waypoint if available, otherwise end path
            if (this.waypointIndex < waypoints.length - 1) {
                this.waypointIndex++;
            } else {
                this.onCollideWithTrashCan();
            }
        }
    }

    
    
    // Method to reduce the enemy's health when it takes damage
    takeDamage(damage) {
        if(!applicationState.isPaused){
            this.health -= damage;
        }
        if (this.health <= 0) {
            this.die();
        }
    }

    // Method to handle enemy death
    die() {
        if(this.alive) {
            this.rewardPlayer();
            // console.log(`${this} enemy has been defeated!`);
            this.onDestroy()
        }
    }

    // Method to reward player on enemy death
    rewardPlayer(){
        applicationState.data.currency += this.reward;
        console.log(`Player rewarded with ${this.reward} coins.`);
    }

    // Remove the enemy from the world when it dies
    onDestroy() {
        if (this.alive) {
            console.log(`${this} enemy is being removed from the game world.`);
            me.game.world.removeChild(this); 
        }
        this.alive = false;
    }
    
    // Method to handle the collision with the Trash Can at end of path
    onCollideWithTrashCan() {
        console.log(`${this._type} collided with the Trash Can and will be removed.`);

        // Deduct a life from the player and destroy enemy unit
        applicationState.data.lives -= 1;
        this.onDestroy();

        // Check if lives reach zero to trigger game over
        if (applicationState.data.lives <= 0) {
            this.gameOver();
        }
    }

    // Triggers game over process
    gameOver() {
        return true
    }

}

export default Enemy;
