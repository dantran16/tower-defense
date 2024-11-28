import * as me from 'melonjs';
import Coffee from './coffee.js';
import Sushi from './sushi.js';
import RedVelvet from './redvelvet.js';
import Bread from './bread.js';
import Egg from './egg.js';
import applicationState from '../../applicationState.js';

class EnemyTasks {
    constructor() {
        this.spawnInterval = 500; // Milliseconds between spawns
        this.waves = [
            // Level 1 (Waves 1–10)
            { enemies: [{ type: 'Sushi', quantity: 10}] }, // Wave 1
            { enemies: [{ type: 'Sushi', quantity: 10}] }, // Wave 2
            { enemies: [{ type: 'Sushi', quantity: 10}, { type: 'RedVelvet', quantity: 1}] }, // Wave 3
            { enemies: [{ type: 'Sushi', quantity: 5}, { type: 'RedVelvet', quantity: 5}] }, // Wave 4
            { enemies: [{ type: 'Sushi', quantity: 5}, { type: 'RedVelvet', quantity: 5}] }, // Wave 5
            { enemies: [{ type: 'Sushi', quantity: 10}, { type: 'RedVelvet', quantity: 10}] }, // Wave 6
            { enemies: [{ type: 'RedVelvet', quantity: 10}, { type: 'Coffee', quantity: 1}] }, // Wave 7
            { enemies: [{ type: 'RedVelvet', quantity: 5}, { type: 'Coffee', quantity: 5}] }, // Wave 8
            { enemies: [{ type: 'RedVelvet', quantity: 5}, { type: 'Coffee', quantity: 5}] }, // Wave 9
            { enemies: [{ type: 'RedVelvet', quantity: 10}, { type: 'Coffee', quantity: 10}] }, // Wave 10
        
            // Level 2 (Waves 11–20)
            { enemies: [{ type: 'RedVelvet', quantity: 10}] }, // Wave 11
            { enemies: [{ type: 'RedVelvet', quantity: 10}] }, // Wave 12
            { enemies: [{ type: 'RedVelvet', quantity: 10}, { type: 'Coffee', quantity: 1}] }, // Wave 13
            { enemies: [{ type: 'RedVelvet', quantity: 5}, { type: 'Coffee', quantity: 5}] }, // Wave 14
            { enemies: [{ type: 'RedVelvet', quantity: 5 }, { type: 'Coffee', quantity: 5}] }, // Wave 15
            { enemies: [{ type: 'RedVelvet', quantity: 10}, { type: 'Coffee', quantity: 10}] }, // Wave 16
            { enemies: [{ type: 'Coffee', quantity: 10}, { type: 'Bread', quantity: 1}] }, // Wave 17
            { enemies: [{ type: 'Coffee', quantity: 5}, { type: 'Bread', quantity: 5}] }, // Wave 18
            { enemies: [{ type: 'Coffee', quantity: 5}, { type: 'Bread', quantity: 5}] }, // Wave 19
            { enemies: [{ type: 'Coffee', quantity: 10}, { type: 'Bread', quantity: 10}] }, // Wave 20      
            
            // Level 3 (Waves 21–30)
            { enemies: [{ type: 'Coffee', quantity: 10}] }, // Wave 21
            { enemies: [{ type: 'Coffee', quantity: 10}] }, // Wave 22
            { enemies: [{ type: 'Coffee', quantity: 10}, { type: 'Bread', quantity: 1}] }, // Wave 23
            { enemies: [{ type: 'Coffee', quantity: 5}, { type: 'Bread', quantity: 5}] }, // Wave 24
            { enemies: [{ type: 'Coffee', quantity: 5}, { type: 'Bread', quantity: 5}] }, // Wave 25
            { enemies: [{ type: 'Coffee', quantity: 10}, { type: 'Bread', quantity: 10}] }, // Wave 26
            { enemies: [{ type: 'Bread', quantity: 10}, { type: 'Egg', quantity: 1}] }, // Wave 27
            { enemies: [{ type: 'Bread', quantity: 5}, { type: 'Egg', quantity: 5}] }, // Wave 28
            { enemies: [{ type: 'Bread', quantity: 5}, { type: 'Egg', quantity: 5}] }, // Wave 29
            { enemies: [{ type: 'Bread', quantity: 10}, { type: 'Egg', quantity: 10}] }, // Wave 30     
            ]
            this.currentWave = 0;
    }


    startWave() {
        applicationState.data.wave++;
        
        if (this.currentWave >= this.waves.length) {
            console.log("All waves completed!");
            return;
        }

        const wave = this.waves[this.currentWave];

        const totalEnemiesInWave = wave.enemies.reduce((sum, config) => sum + config.quantity, 0);
        applicationState.data.enemies = totalEnemiesInWave;

        let enemyIndex = 0; 
        let enemiesSpawned = 0;
    

        this.waveInterval = setInterval(() => {
            const enemyConfig = wave.enemies[enemyIndex];
            const lane = Math.floor(Math.random() * 3)
            
            if (enemiesSpawned < enemyConfig.quantity) {
                this.spawnEnemy(enemyConfig.type, lane);
                enemiesSpawned++;
                applicationState.data.activeEnemies = enemiesSpawned;
            } else {
                // Move to the next enemy type in the wave
                enemyIndex++;
                enemiesSpawned = 0; // Reset counter for the new enemy type
                if (enemyIndex >= wave.enemies.length) { 
                    // All enemy types for this wave have been spawned
                    clearInterval(this.waveInterval);
                    this.currentWave++;
                }
            }
        


        }, this.spawnInterval);
    }

    spawnEnemy(enemyType, lane) {
        let enemy;
        if (enemyType === 'Sushi') {
            enemy = new Sushi(0, 0, lane);
        } else if (enemyType === 'RedVelvet') {
            enemy = new RedVelvet(0, 0, lane);
        } else if (enemyType === 'Coffee') {
            enemy = new Coffee(0, 0, lane);
        } else if (enemyType === 'Bread') {
            enemy = new Bread(0, 0, lane);
        } else if (enemyType === 'Egg') {
            enemy = new Egg(0, 0, lane);
        } else {
            console.warn(`Unknown enemy type: ${enemyType}`);
            return;
        }

        if (applicationState.data.currency < 0) {
            clearInterval(this.waveInterval);
        }

        else{
        me.game.world.addChild(enemy);
        }
    }

    
}
export default EnemyTasks;
