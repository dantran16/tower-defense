/**
 * hold all game specific data
 */
import EnemyTasks from "./renderables/enemies/EnemyTasks";
import validMatrix from "./validMatrix";

const enemyTasks = new EnemyTasks();
const applicationState = {

    /**
     * object where to store game global scole
     */

    data : {
        playerHealth: 0,
        currency: 0,
        level: 0,
        wave: 0,
        enemies: 0,
        activeEnemies:0,
    },
    isPaused: false,
    pauseMusic: false,
    towerMenu: null,
    texture : null,  // a reference to the texture atlas
    enemyTasks: enemyTasks,
    creation: false,
    validMatrix: null,
};

export default applicationState;
