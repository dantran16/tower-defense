import * as me from 'melonjs';
import applicationState from '../../applicationState';
import mapData from '/src/data/map/map.json';;

class Enemy extends me.Entity {
    constructor(x, y, settings) {
        // Call parent constructor to initialize the position and settings
        super(x, y, settings);

        // Initialize properties for enemy unit
        this.health = 0;         // Health of the enemy
        this.speed = 0;           // Movement speed of the enemy
        this.reward = 0;         // Reward for kill enemy
        
        this.isDestroyed = false; // Object exists
        this.body.gravity = 0; // Remove gravity
        this.alwaysUpdate = true; // Always update even off-screen
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);
        this.body.addShape(new me.Ellipse(0, 0, 25, 25));

        // Generates waypoint paths
        this.direction = {x: 0, y: 1};
        this.pathWaypoints = this.generatePathWaypoints(mapData);
        this.currentWaypoint = 0;
    }

    // Return enemy stats
    getEnemyStats() {
        return{
            health: this.health,
            speed: this.speed,
            reward: this.reward
        }
    }

    // Method to extract path waypoints from JSON map data
    generatePathWaypoints(mapData) {
        const pathWaypoints = [];
        const tileWidth = mapData.tilewidth;
        const tileHeight = mapData.tileheight;

        // Find the "path" layer
        const pathLayer = mapData.layers.find(layer => layer.name === "path");
        
        if (pathLayer) {
            // Loop through each tile in the path layer
            pathLayer.data.forEach((tile, index) => {
                if (tile === 475) { // Check for the blue path tile ID 475
                    const x = (index % mapData.width) * tileWidth;
                    const y = Math.floor(index / mapData.width) * tileHeight;
                    pathWaypoints.push({ x, y });
                }
            });
        }

        return pathWaypoints;
    }

    // Update the enemy's movement each frame
    update(dt) {
        if (this.waypoints && this.currentWaypoint < this.waypoints.length) {
            this.moveToWaypoint(dt);
        }//  else {
        //     this.onCollideWithTrashCan();  // If no more waypoints, consider the path complete
        // }

        this.body.update(dt);
        return true;
    }

    moveToWaypoint(dt) {
        const target = this.waypoints[this.currentWaypoint];
        const dx = target.x - this.pos.x;
        const dy = target.y - this.pos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 1) {
            this.pos.x += (dx / distance) * this._speed * dt / 1000;
            this.pos.y += (dy / distance) * this._speed * dt / 1000;
        } else {
            this.currentWaypoint++;
        }
    }

    // Method to reduce the enemy's health when it takes damage
    takeDamage(damage) {
        this.health -= damage;
        if (this.health <= 0) {
            this.die();
        }
    }

    // Method to handle enemy death
    die() {
        if(this.health <= 0) {
            this.onDestroy()
            this.rewardPlayer();
            console.log(`${this.element} enemy has been defeated!`);
        }
    }

    // Method to reward player on enemy death
    rewardPlayer(){
        applicationState.data.currency += this.reward;
        //this.updateCurrency();

        console.log(`Player rewarded with ${this.reward} coins.`);
    }

    
    // Method to handle the collision with the Trash Can at end of path
    onCollideWithTrashCan() {
        console.log(`${this._type} collided with the Trash Can and will be removed.`);

        // Deduct a life from the player
        applicationState.data.lives -= 1;
        // this.updateLives();

        // Check if lives reach zero to trigger game over
        if (applicationState.data.lives <= 0) {
            this.gameOver();
        }

        // Remove the enemy from the game world
        this.onDestroy();
    }

    
    onDestroy() {
        // Remove the enemy from the game world when it dies
        if (this.isDestroyed) return; // Prevent multiple removals
        this.isDestroyed = true;

        console.log(`${this.element} enemy is being removed from the game world.`);
        
        // Safely remove the enemy from the game world if it exists
        // if (this.inWorld) {
            me.game.world.removeChild(this);
        // }  
    }

}

export default Enemy;
