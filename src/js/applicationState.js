/**
 * hold all game specific data
 */
import EnemyTasks from "./renderables/enemies/EnemyTasks";

const enemyTasks = new EnemyTasks();
const applicationState = {

    /**
     * object where to store game global scole
     */

    data : {
        playerHealth: 10,
        currency: 100,
        level: 1,
        wave: 1,
        enemies: 1,
        activeEnemies:0,
    },
    isPaused: false,
    isTowerMenu: false,
    waveInProgress: false, // determines if wave is in progress
    texture : null,  // a reference to the texture atlas
    enemyTasks: enemyTasks,
};

export default applicationState;
