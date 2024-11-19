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
        currency: 1000,
        level: 1,
        wave: 0,
        enemies: 1,
        activeEnemies:0,
    },
    isPaused: false,
    towerMenu: null,
    texture : null,  // a reference to the texture atlas
    enemyTasks: enemyTasks,
    creation: false,
};

export default applicationState;
