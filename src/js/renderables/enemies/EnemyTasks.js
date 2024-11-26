import * as me from 'melonjs';
import Coffee from './coffee.js';
import Sushi from './sushi.js';
import RedVelvet from './redvelvet.js';
import Item1 from './item1.js';
import Item2 from './item2.js';
import applicationState from '../../applicationState.js';

class EnemyTasks {
    constructor() {
        this.spawnInterval = 500; // Milliseconds between spawns
        this.waves = [
            // Level 1 (Waves 1–10)
            { enemies: [{ type: 'Sushi', quantity: 10, lane: 1 }] }, // Wave 1
            { enemies: [{ type: 'Sushi', quantity: 10, lane: 1 }] }, // Wave 2
            { enemies: [{ type: 'Sushi', quantity: 10, lane: 1 }, { type: 'RedVelvet', quantity: 1, lane: 1 }] }, // Wave 3
            { enemies: [{ type: 'Sushi', quantity: 5, lane: 1 }, { type: 'RedVelvet', quantity: 5, lane: 1 }] }, // Wave 4
            { enemies: [{ type: 'Sushi', quantity: 5, lane: 1 }, { type: 'RedVelvet', quantity: 5, lane: 1 }] }, // Wave 5
            { enemies: [{ type: 'Sushi', quantity: 5, lane: 1 }, { type: 'RedVelvet', quantity: 5, lane: 1 }] }, // Wave 6
            { enemies: [{ type: 'Sushi', quantity: 10, lane: 1 }, { type: 'RedVelvet', quantity: 10, lane: 1 }] }, // Wave 7
            { enemies: [{ type: 'RedVelvet', quantity: 5, lane: 1 }, { type: 'Coffee', quantity: 1, lane: 1 }] }, // Wave 8
            { enemies: [{ type: 'RedVelvet', quantity: 5, lane: 1 }, { type: 'Coffee', quantity: 5, lane: 1 }] }, // Wave 9
            { enemies: [{ type: 'RedVelvet', quantity: 10, lane: 1 }, { type: 'Coffee', quantity: 10, lane: 1 }] }, // Wave 10
        
            // Level 2 (Waves 11–20)
            { enemies: [{ type: 'RedVelvet', quantity: 10, lane: 1 }] }, // Wave 1
            { enemies: [{ type: 'RedVelvet', quantity: 10, lane: 1 }] }, // Wave 2
            { enemies: [{ type: 'RedVelvet', quantity: 10, lane: 1 }, { type: 'Coffee', quantity: 1, lane: 1 }] }, // Wave 3
            { enemies: [{ type: 'RedVelvet', quantity: 5, lane: 1 }, { type: 'Coffee', quantity: 5, lane: 1 }] }, // Wave 4
            { enemies: [{ type: 'RedVelvet', quantity: 5, lane: 1 }, { type: 'Coffee', quantity: 5, lane: 1 }] }, // Wave 5
            { enemies: [{ type: 'RedVelvet', quantity: 5, lane: 1 }, { type: 'Coffee', quantity: 5, lane: 1 }] }, // Wave 6
            { enemies: [{ type: 'RedVelvet', quantity: 10, lane: 1 }, { type: 'Coffee', quantity: 10, lane: 1 }] }, // Wave 7
            { enemies: [{ type: 'Coffee', quantity: 5, lane: 1 }, { type: 'Item1', quantity: 1, lane: 1 }] }, // Wave 8
            { enemies: [{ type: 'Coffee', quantity: 5, lane: 1 }, { type: 'Item1', quantity: 5, lane: 1 }] }, // Wave 9
            { enemies: [{ type: 'Coffee', quantity: 10, lane: 1 }, { type: 'Item1', quantity: 10, lane: 1 }] }, // Wave 10      
            
            // Level 3 (Waves 21–30)
            { enemies: [{ type: 'Coffee', quantity: 10, lane: 1 }] }, // Wave 1
            { enemies: [{ type: 'Coffee', quantity: 10, lane: 1 }] }, // Wave 2
            { enemies: [{ type: 'Coffee', quantity: 10, lane: 1 }, { type: 'Item1', quantity: 10, lane: 1 }] }, // Wave 3
            { enemies: [{ type: 'Coffee', quantity: 5, lane: 1 }, { type: 'Item1', quantity: 5, lane: 1 }] }, // Wave 4
            { enemies: [{ type: 'Coffee', quantity: 5, lane: 1 }, { type: 'Item1', quantity: 5, lane: 1 }] }, // Wave 5
            { enemies: [{ type: 'Coffee', quantity: 5, lane: 1 }, { type: 'Item1', quantity: 5, lane: 1 }] }, // Wave 6
            { enemies: [{ type: 'Coffee', quantity: 10, lane: 1 }, { type: 'Item1', quantity: 10, lane: 1 }] }, // Wave 7
            { enemies: [{ type: 'Item1', quantity: 5, lane: 1 }, { type: 'Item2', quantity: 1, lane: 1 }] }, // Wave 8
            { enemies: [{ type: 'Item1', quantity: 5, lane: 1 }, { type: 'Item2', quantity: 5, lane: 1 }] }, // Wave 9
            { enemies: [{ type: 'Item1', quantity: 10, lane: 1 }, { type: 'Item2', quantity: 10, lane: 1 }] }, // Wave 10     
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
            
            if (enemiesSpawned < enemyConfig.quantity) {
                this.spawnEnemy(enemyConfig.type, enemyConfig.lane);
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
        } else if (enemyType === 'Item1') {
            enemy = new Item1(0, 0, lane);
        } else if (enemyType === 'Item2') {
            enemy = new Item2(0, 0, lane);
        } else if (enemyType === 'Item3') {
            enemy = new Item3(0, 0, lane);
        } else if (enemyType === 'Item4') {
            enemy = new Item4(0, 0, lane);
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
