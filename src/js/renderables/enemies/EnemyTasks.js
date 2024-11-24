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
        
            // Level 2 (Waves 11–20)
            { enemies: [{ type: 'Sushi', quantity: 50 }, { type: 'RedVelvet', quantity: 5 }] }, // Wave 11
            { enemies: [{ type: 'Sushi', quantity: 40 }, { type: 'RedVelvet', quantity: 10 }] }, // Wave 12
            { enemies: [{ type: 'Sushi', quantity: 60 }, { type: 'RedVelvet', quantity: 15 }] }, // Wave 13
            { enemies: [{ type: 'Sushi', quantity: 70 }, { type: 'RedVelvet', quantity: 20 }] }, // Wave 14
            { enemies: [{ type: 'Sushi', quantity: 80 }, { type: 'RedVelvet', quantity: 25 }] }, // Wave 15
            { enemies: [{ type: 'Sushi', quantity: 100 }, { type: 'RedVelvet', quantity: 30 }] }, // Wave 16
            { enemies: [{ type: 'Sushi', quantity: 120 }, { type: 'RedVelvet', quantity: 35 }] }, // Wave 17
            { enemies: [{ type: 'Sushi', quantity: 140 }, { type: 'RedVelvet', quantity: 40 }] }, // Wave 18
            { enemies: [{ type: 'Sushi', quantity: 150 }, { type: 'RedVelvet', quantity: 45 }] }, // Wave 19
            { enemies: [{ type: 'Sushi', quantity: 200 }, { type: 'RedVelvet', quantity: 50 }] }, // Wave 20
        
            // Level 3 (Waves 21–30)
            { enemies: [{ type: 'Sushi', quantity: 100 }, { type: 'RedVelvet', quantity: 25 }, { type: 'Coffee', quantity: 5 }] }, // Wave 21
            { enemies: [{ type: 'Sushi', quantity: 110 }, { type: 'RedVelvet', quantity: 30 }, { type: 'Coffee', quantity: 10 }] }, // Wave 22
            { enemies: [{ type: 'Sushi', quantity: 120 }, { type: 'RedVelvet', quantity: 35 }, { type: 'Coffee', quantity: 15 }] }, // Wave 23
            { enemies: [{ type: 'Sushi', quantity: 130 }, { type: 'RedVelvet', quantity: 40 }, { type: 'Coffee', quantity: 20 }] }, // Wave 24
            { enemies: [{ type: 'Sushi', quantity: 150 }, { type: 'RedVelvet', quantity: 45 }, { type: 'Coffee', quantity: 25 }] }, // Wave 25
            { enemies: [{ type: 'Sushi', quantity: 160 }, { type: 'RedVelvet', quantity: 50 }, { type: 'Coffee', quantity: 30 }] }, // Wave 26
            { enemies: [{ type: 'Sushi', quantity: 170 }, { type: 'RedVelvet', quantity: 55 }, { type: 'Coffee', quantity: 35 }] }, // Wave 27
            { enemies: [{ type: 'Sushi', quantity: 180 }, { type: 'RedVelvet', quantity: 60 }, { type: 'Coffee', quantity: 40 }] }, // Wave 28
            { enemies: [{ type: 'Sushi', quantity: 190 }, { type: 'RedVelvet', quantity: 65 }, { type: 'Coffee', quantity: 45 }] }, // Wave 29
            { enemies: [{ type: 'Sushi', quantity: 200 }, { type: 'RedVelvet', quantity: 70 }, { type: 'Coffee', quantity: 50 }] }, // Wave 30
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
                this.spawnEnemy(enemyConfig.type);
                enemiesSpawned++;
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

        if (applicationState.data.playerHealth <= 0) {
            clearInterval(this.waveInterval);
        }

        else{
        me.game.world.addChild(enemy);
        }
    }

    
}
export default EnemyTasks;
