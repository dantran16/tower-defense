import * as me from 'melonjs';
import Coffee from './coffee.js';
import Sushi from './sushi.js';
import RedVelvet from './redvelvet.js';
import applicationState from '../../applicationState.js';

class EnemyTasks {
    constructor() {
        this.spawnInterval = 1000; // Milliseconds between spawns
        this.activeEnemies = [];
        this.waves = [
            { enemies: [{ type: 'Sushi', quantity: 10 }] }, // Wave 1
            { enemies: [{ type: 'Sushi', quantity: 20 }] }, // Wave 2
            { enemies: [{ type: 'Sushi', quantity: 30 }] }, // Wave 3
            { enemies: [{ type: 'Sushi', quantity: 30 }, { type: 'RedVelvet', quantity: 1 }] }, // Wave 4
            { enemies: [{ type: 'Sushi', quantity: 20 }, { type: 'RedVelvet', quantity: 3 }] }, // Wave 5
            { enemies: [{ type: 'Sushi', quantity: 50 }, { type: 'RedVelvet', quantity: 10 }] }, // Wave 6
            { enemies: [{ type: 'Sushi', quantity: 40 }, { type: 'RedVelvet', quantity: 10 }] }, // Wave 7
            { enemies: [{ type: 'Sushi', quantity: 10 }, { type: 'RedVelvet', quantity: 20 }] }, // Wave 8
            { enemies: [{ type: 'Sushi', quantity: 10 }, { type: 'RedVelvet', quantity: 40 }] }, // Wave 9
            { enemies: [{ type: 'Sushi', quantity: 30 }, { type: 'RedVelvet', quantity: 60 }] }, // Wave 10
        ];

        //Test Code for waves or its too long to run the whole level.
    // this.waves = [
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
    // { enemies: [{ type: 'RedVelvet', quantity: 10 }] },
    
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
                this.spawnEnemy(enemyConfig.type);
                enemiesSpawned++;
            } else {
                // Move to the next enemy type in the wave
                enemyIndex++;
                enemiesSpawned = 0; // Reset counter for the new enemy type
                if (enemyIndex >= wave.enemies.length ) {
                    // All enemy types for this wave have been spawned
                    clearInterval(this.waveInterval);
                    this.currentWave++;
                }
                
            if((applicationState.data.wave == 11) || (applicationState.data.wave == 21)) {
                applicationState.data.level++
            };
            }
        }, this.spawnInterval);
    }

    spawnEnemy(enemyType) {
        let enemy;
        if (enemyType === 'Sushi') {
            enemy = new Sushi();
        } else if (enemyType === 'RedVelvet') {
            enemy = new RedVelvet();
        } else if (enemyType === 'Coffee') {
            enemy = new Coffee();
        } else {
            console.warn(`Unknown enemy type: ${enemyType}`);
            return;
        }

        me.game.world.addChild(enemy);
        this.activeEnemies.push(enemy);
    }
}
export default EnemyTasks;
