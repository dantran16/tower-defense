import * as me from 'melonjs';
import Coffee from './coffee.js';
import Sushi from './sushi.js';
import RedVelvet from './redvelvet.js';
import applicationState from '../../applicationState.js';

class EnemyTasks {
    constructor() {
        this.spawnInterval = 500; // Milliseconds between spawns
        this.waves = [
            // Level 1 (Waves 1–10)
            { enemies: [{ type: 'Sushi', quantity: 10, lane: 1 }] }, // Wave 1
            { enemies: [{ type: 'Sushi', quantity: 20, lane: 2 }] }, // Wave 2
            { enemies: [{ type: 'Sushi', quantity: 30, lane: 1 }] }, // Wave 3
            { enemies: [{ type: 'Sushi', quantity: 30, lane: 1 }, { type: 'RedVelvet', quantity: 1, lane: 1 }] }, // Wave 4
            { enemies: [{ type: 'Sushi', quantity: 20, lane: 1 }, { type: 'RedVelvet', quantity: 3, lane: 1 }] }, // Wave 5
            { enemies: [{ type: 'Sushi', quantity: 50, lane: 1 }, { type: 'RedVelvet', quantity: 10, lane: 1 }] }, // Wave 6
            { enemies: [{ type: 'Sushi', quantity: 40, lane: 1 }, { type: 'RedVelvet', quantity: 10, lane: 1 }] }, // Wave 7
            { enemies: [{ type: 'Sushi', quantity: 10, lane: 1 }, { type: 'RedVelvet', quantity: 20, lane: 1 }] }, // Wave 8
            { enemies: [{ type: 'Sushi', quantity: 10, lane: 1 }, { type: 'RedVelvet', quantity: 40, lane: 1 }] }, // Wave 9
            { enemies: [{ type: 'Sushi', quantity: 30, lane: 1 }, { type: 'RedVelvet', quantity: 60, lane: 1 }] }, // Wave 10
        
            // Level 2 (Waves 11–20)
            { enemies: [{ type: 'Sushi', quantity: 50, lane: 1 }, { type: 'RedVelvet', quantity: 5, lane: 1 }] }, // Wave 11
            { enemies: [{ type: 'Sushi', quantity: 40, lane: 1 }, { type: 'RedVelvet', quantity: 10, lane: 1 }] }, // Wave 12
            { enemies: [{ type: 'Sushi', quantity: 60, lane: 1 }, { type: 'RedVelvet', quantity: 15, lane: 1 }] }, // Wave 13
            { enemies: [{ type: 'Sushi', quantity: 70, lane: 1 }, { type: 'RedVelvet', quantity: 20, lane: 1 }] }, // Wave 14
            { enemies: [{ type: 'Sushi', quantity: 80, lane: 1 }, { type: 'RedVelvet', quantity: 25, lane: 1 }] }, // Wave 15
            { enemies: [{ type: 'Sushi', quantity: 100, lane: 1 }, { type: 'RedVelvet', quantity: 30, lane: 1 }] }, // Wave 16
            { enemies: [{ type: 'Sushi', quantity: 120, lane: 1 }, { type: 'RedVelvet', quantity: 35, lane: 1 }] }, // Wave 17
            { enemies: [{ type: 'Sushi', quantity: 140, lane: 1 }, { type: 'RedVelvet', quantity: 40, lane: 1 }] }, // Wave 18
            { enemies: [{ type: 'Sushi', quantity: 150, lane: 1 }, { type: 'RedVelvet', quantity: 45, lane: 1 }] }, // Wave 19
            { enemies: [{ type: 'Sushi', quantity: 200, lane: 1 }, { type: 'RedVelvet', quantity: 50, lane: 1 }] }, // Wave 20
        
            // Level 3 (Waves 21–30)
            { enemies: [{ type: 'Sushi', quantity: 100, lane: 1 }, { type: 'RedVelvet', quantity: 25, lane: 1 }, { type: 'Coffee', quantity: 5, lane: 1 }] }, // Wave 21
            { enemies: [{ type: 'Sushi', quantity: 110, lane: 1 }, { type: 'RedVelvet', quantity: 30, lane: 1 }, { type: 'Coffee', quantity: 10, lane: 1 }] }, // Wave 22
            { enemies: [{ type: 'Sushi', quantity: 120, lane: 1 }, { type: 'RedVelvet', quantity: 35, lane: 1 }, { type: 'Coffee', quantity: 15, lane: 1 }] }, // Wave 23
            { enemies: [{ type: 'Sushi', quantity: 130, lane: 1 }, { type: 'RedVelvet', quantity: 40, lane: 1 }, { type: 'Coffee', quantity: 20, lane: 1 }] }, // Wave 24
            { enemies: [{ type: 'Sushi', quantity: 150, lane: 1 }, { type: 'RedVelvet', quantity: 45, lane: 1 }, { type: 'Coffee', quantity: 25, lane: 1 }] }, // Wave 25
            { enemies: [{ type: 'Sushi', quantity: 160, lane: 1 }, { type: 'RedVelvet', quantity: 50, lane: 1 }, { type: 'Coffee', quantity: 30, lane: 1 }] }, // Wave 26
            { enemies: [{ type: 'Sushi', quantity: 170, lane: 1 }, { type: 'RedVelvet', quantity: 55, lane: 1 }, { type: 'Coffee', quantity: 35, lane: 1 }] }, // Wave 27
            { enemies: [{ type: 'Sushi', quantity: 180, lane: 1 }, { type: 'RedVelvet', quantity: 60, lane: 1 }, { type: 'Coffee', quantity: 40, lane: 1 }] }, // Wave 28
            { enemies: [{ type: 'Sushi', quantity: 190, lane: 1 }, { type: 'RedVelvet', quantity: 65, lane: 1 }, { type: 'Coffee', quantity: 45, lane: 1 }] }, // Wave 29
            { enemies: [{ type: 'Sushi', quantity: 200, lane: 1 }, { type: 'RedVelvet', quantity: 70, lane: 1 }, { type: 'Coffee', quantity: 50, lane: 1 }] }, // Wave 30
        ];
        
        //Test Code for waves or its too long to run the whole level.
    // this.waves = [
    // { enemies: [{ type: 'Coffee', quantity: 100 }] },
    // { enemies: [{ type: 'RedVelvet', quantity: 0 }] },
    // { enemies: [{ type: 'Coffee', quantity: 0 }] },
    // { enemies: [{ type: 'Sushi', quantity: 0 }] },
    // { enemies: [{ type: 'RedVelvet', quantity: 0 }] },
    // { enemies: [{ type: 'Coffee', quantity: 0 }] },
    // { enemies: [{ type: 'Sushi', quantity: 0 }] },
    // { enemies: [{ type: 'RedVelvet', quantity: 0 }] },
    // { enemies: [{ type: 'Coffee', quantity: 0 }] },
    // { enemies: [{ type: 'Sushi', quantity: 0 }] },
    // { enemies: [{ type: 'Sushi', quantity: 0 }] },
    // { enemies: [{ type: 'RedVelvet', quantity: 0 }] },
    // { enemies: [{ type: 'Coffee', quantity: 0 }] },
    // { enemies: [{ type: 'Sushi', quantity: 0 }] },
    // { enemies: [{ type: 'RedVelvet', quantity: 0 }] },
    // { enemies: [{ type: 'Coffee', quantity: 0 }] },
    // { enemies: [{ type: 'Sushi', quantity: 0 }] },
    // { enemies: [{ type: 'RedVelvet', quantity: 0 }] },
    // { enemies: [{ type: 'Coffee', quantity: 0 }] },
    // { enemies: [{ type: 'Sushi', quantity: 0 }] },
    // { enemies: [{ type: 'Sushi', quantity: 0 }] },
    // { enemies: [{ type: 'RedVelvet', quantity: 0 }] },
    // { enemies: [{ type: 'Coffee', quantity: 0 }] },
    // { enemies: [{ type: 'Sushi', quantity: 0 }] },
    // { enemies: [{ type: 'RedVelvet', quantity: 0 }] },
    // { enemies: [{ type: 'Coffee', quantity: 0 }] },
    // { enemies: [{ type: 'Sushi', quantity: 0 }] },
    // { enemies: [{ type: 'RedVelvet', quantity: 0 }] },
    // { enemies: [{ type: 'Coffee', quantity: 0 }] },
    // { enemies: [{ type: 'RedVelvet', quantity: 0 }] },
    
    //   ];
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
        } else {
            console.warn(`Unknown enemy type: ${enemyType}`);
            return;
        }

        if (applicationState.data.playerHealth <= 0) {
            clearInterval(this.waveInterval);
        }

        else{
        me.game.world.addChild(enemy);
        }
    }

    
}
export default EnemyTasks;
