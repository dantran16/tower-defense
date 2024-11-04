import * as me from 'melonjs';
import applicationState from '../../applicationState';
import mapData from '/src/data/map/map.json';

class Enemy extends me.Entity {
    constructor(x, y, settings) {
        // Call parent constructor to initialize the position and settings
        super(x, y, settings);

        // Initialize properties for enemy unit
        this.health = 0;    // Health of the enemy
        this.speed = 0;     // Movement speed of the enemy
        this.reward = 0;    // Reward for kill enemy
        
        this.body.gravity = 0;     // Remove gravity
        this.alwaysUpdate = true;   // Always update even off-screen
        this.body.collisionType = me.collision.types.ENEMY_OBJECT;      // Acts as enemy object
        this.body.setCollisionMask(me.collision.types.PLAYER_OBJECT);   // Can only collide with player objects
        this.body.addShape(new me.Ellipse(0, 0, 25, 25));               // Hitbox assumes the shape of a circle

        this.pathWaypoints = this.generatePathWaypoints(mapData);
        this.waypointIndex = 0;

        if (this.pathWaypoints.length > 0) {
            this.pos.set(this.pathWaypoints[0].x, this.pathWaypoints[0].y);
        }

        this.startMovement()

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
        if (this.pathWaypoints && this.waypointIndex < this.pathWaypoints.length) {
            this.moveToWaypoint(dt);
        } else {
            this.onCollideWithTrashCan()
            console.log("Enemy reached the end of its path or no waypoints available.");
        }

        // Collision and physics update
        this.body.update(dt);

        return true; // Indicates that rendering is needed
    }
    
    generatePathWaypoints(mapData) {
        const pathWaypoints = [];
        const objectLayer = mapData.layers.find(layer => layer.type === "objectgroup" && layer.name === "path");

        if (objectLayer) {
            const pathObject = objectLayer.objects.find(obj => obj.type === "path");
            if (pathObject && pathObject.polyline) {
                const offsetX = pathObject.x || 0;
                const offsetY = pathObject.y || 0;

                pathObject.polyline.forEach((point) => {
                    const x = offsetX + point.x;
                    const y = offsetY + point.y;

                    if (!isNaN(x) && !isNaN(y)) {
                        pathWaypoints.push({ x, y });
                    }
                });
            }
        }

        return pathWaypoints;
    }

    moveToWaypoint() {
    if (!this.pathWaypoints || this.waypointIndex >= this.pathWaypoints.length) return;

    const target = this.pathWaypoints[this.waypointIndex];
    const dx = target.x - this.pos.x;
    const dy = target.y - this.pos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < this.speed) {
        // Snap directly to the waypoint and move to the next one
        this.pos.set(target.x, target.y);
        this.waypointIndex++;

        if (this.waypointIndex >= this.pathWaypoints.length) {
            console.log("Reached the final waypoint.");
            return;
        }
    } else {
        // Normalize the direction vector
        const directionX = dx / distance;
        const directionY = dy / distance;

        // Move towards the target with constant speed
        this.pos.x += directionX * this.speed;
        this.pos.y += directionY * this.speed;

        // Log movement details
        console.log(`Moving towards waypoint ${this.waypointIndex} with constant speed. Position: (${this.pos.x.toFixed(2)}, ${this.pos.y.toFixed(2)}), Distance to target: ${distance.toFixed(2)}`);
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
