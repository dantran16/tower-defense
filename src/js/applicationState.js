/**
 * hold all game specific data
 */
var applicationState = {

    /**
     * object where to store game global scole
     */
    data : {
        playerHealth: 10,
        currency: 100,
        level: 1,
        wave: 1,
        enemies: 10
        // lives: 10?
    },
    isPaused: false,
    isTowerMenu: false,
    // a reference to the texture atlas
    texture : null
};

export default applicationState;
