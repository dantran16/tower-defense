import * as me from 'melonjs';
import Coffee from './coffee.js';
import Sushi from './sushi.js';

class EnemyTasks {
    constructor() {
        this.enemiesPerWave = 1; // Number of enemies per wave
        this.spawnInterval = 1000; // Milliseconds between spawns
        this.activeEnemies = [];
        
    }

    startWave() {
        let spawnedEnemies = 0;

        this.waveInterval = setInterval(() => {
            if (spawnedEnemies < this.enemiesPerWave) {
                this.spawnEnemy();
                spawnedEnemies++;
            } else {
                clearInterval(this.waveInterval);
            }
        }, this.spawnInterval);
    }

    spawnEnemy() {
        const enemy = new Coffee(); // Instantiate one enemy type per spawn
        me.game.world.addChild(enemy);
        this.activeEnemies.push(enemy);
        

        console.log(`Spawned Coffee enemy at position (${enemy.pos.x}, ${enemy.pos.y})`);
    }

    spawnEnemy2() {
        const enemy = new Sushi(); // Instantiate one enemy type per spawn
        me.game.world.addChild(enemy);
        this.activeEnemies.push(enemy);
}AV
}
export default EnemyTasks;
