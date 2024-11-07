import * as me from 'melonjs';
import { state } from "melonjs";
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

        this.isKinematic = false;
        this.pathWaypoints = waypoints;
        this.waypointIndex = 0;
        this.changeX = 0
        this.changeY = 0

        if (this.pathWaypoints.length > 0) {
            this.pos.set(this.pathWaypoints[0].x, this.pathWaypoints[0].y);
        }
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
        if (this.waypointIndex < this.pathWaypoints.length) {
            if (!applicationState.isPaused && this.alive) {
                this.moveToWaypoint();
            }
        } else {
            this.onCollideWithTrashCan();
            console.log("Enemy reached the end of its path or no waypoints available.");
        }
    }

    moveToWaypoint() { // Default dt for setInterval update
        // Check if current waypoint index is valid
        if (this.waypointIndex >= this.pathWaypoints.length) {
            console.error(`Invalid waypoint index: ${this.waypointIndex}. Waypoint index is out of bounds.`);
            this.onCollideWithTrashCan(); // Assume the end of the path
            return;
        }

        // Get the current waypoint to move towards
        let waypoint = this.pathWaypoints[this.waypointIndex];

        // Ensure the waypoint exists (guard against undefined)
        if (!waypoint) {
            console.error(`Waypoint at index ${this.waypointIndex} is undefined.`);
            return;
        }

        waypoint = this.pathWaypoints[this.waypointIndex]
        // determine the changeX/changeY
        if (this.pos.x - waypoint.x > 0) {
            this.changeX = -this.speed * 2
        }
        else if (this.pos.x - waypoint.x < 0) {
            this.changeX = this.speed * 2
        }
        else if (this.pos.y - waypoint.y > 0) {
            this.changeY = -this.speed * 2
        }
        else { //(this.pos.y - waypoint.y < 0)
            this.changeY = this.speed * 2
        }

        let xDistance = Math.abs(this.pos.x - waypoint.x)
        let yDistance = Math.abs(this.pos.y - waypoint.y)

        if (xDistance >= 4) {
            this.pos.x += this.changeX
        }
        else if (yDistance >= 4) {
            this.pos.y += this.changeY
        }
        else {
            // reset the change in x/y
            this.pos.x = waypoint.x
            this.pos.y = waypoint.y
            // increment to next waypoint
            this.waypointIndex += 1
        }
    }
    
    // Method to reduce the enemy's health when it takes damage
    takeDamage(damage) {
        if(!applicationState.isPaused){
            this.health -= damage;
        }
        if (this.health <= 0) {
            // console.log(`${this} enemy has been defeated!`);
            this.rewardPlayer();
            this.die();
        }
    }

    // Method to handle enemy death
    die() {
        if(this.alive) {
            console.log(`${this} enemy is being removed from the game world.`);
            me.game.world.removeChild(this);
        }
        this.alive = false
    }

    // Method to reward player on enemy death
    rewardPlayer(){
        applicationState.data.currency += this.reward;
        console.log(`Player rewarded with ${this.reward} coins.`);
    }
    
    // Method to handle the collision with the Trash Can at end of path
    onCollideWithTrashCan() {
        console.log(`${this._type} collided with the Trash Can and will be removed.`);

        // Deduct a life from the player, destroy enemy unit, and reduce number of enemies by 1
        applicationState.data.playerHealth -= 1;
        applicationState.data.enemies -= 1;
        this.die();

        // Display game over screen if player health reaches 0
        if (applicationState.data.playerHealth <= 0) {
            state.change(state.GAMEOVER);
        }
    }

    // Triggers game over process
    gameOver() {
        return true
    }

}

export default Enemy;
