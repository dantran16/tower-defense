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
        console.log('HERE',this.pathWaypoints)
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

    moveToWaypoint(dt = 16) { // Default dt for setInterval update
        // Check if current waypoint index is valid
        if (this.waypointIndex >= this.pathWaypoints.length) {
            console.error(`Invalid waypoint index: ${this.waypointIndex}. Waypoint index is out of bounds.`);
            this.onCollideWithTrashCan(); // Assume the end of the path
            return;
        }

        // Get the current waypoint to move towards
        const waypoint = this.pathWaypoints[this.waypointIndex];
        
        // Ensure the waypoint exists (guard against undefined)
        if (!waypoint) {
            console.error(`Waypoint at index ${this.waypointIndex} is undefined.`);
            return;
        }

        // Calculate the distance between the enemy and the waypoint
        const yDistance = waypoint.y - (this.pos.y + this.height / 2);
        const xDistance = waypoint.x - (this.pos.x + this.width / 2);

        // Calculate the angle to determine direction
        const angle = Math.atan2(yDistance, xDistance);

        // Define movement speed (pixels per second)
        const speed = 100; // Adjust the speed value if needed for a smooth experience

        // Update velocity based on the calculated angle
        this.velocity = {
            x: Math.cos(angle) * speed * (dt / 1000), // Factor in delta time for smooth movement
            y: Math.sin(angle) * speed * (dt / 1000)
        };

        // Update the position based on velocity
        this.pos.x += this.velocity.x;
        this.pos.y += this.velocity.y;

        // Update center position
        this.center = {
            x: this.pos.x + this.width / 2,
            y: this.pos.y + this.height / 2
        };

        // Log the movement information for debugging
        console.log(`Current position: (${this.center.x.toFixed(2)}, ${this.center.y.toFixed(2)}), Target: (${waypoint.x}, ${waypoint.y}), Distance: ${Math.hypot(xDistance, yDistance).toFixed(2)}, Waypoint Index: ${this.waypointIndex}`);

        // Check if the enemy is close enough to the current waypoint to consider it "reached"
        if (
            Math.abs(Math.round(this.center.x) - Math.round(waypoint.x)) < Math.abs(this.velocity.x) &&
            Math.abs(Math.round(this.center.y) - Math.round(waypoint.y)) < Math.abs(this.velocity.y) &&
            this.waypointIndex < this.pathWaypoints.length - 1
        ) {
            console.log(`Reached waypoint ${this.waypointIndex}. Moving to next waypoint.`);
            this.waypointIndex++;
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
