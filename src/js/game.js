/**
 * hold all game specific data
 */
var game = {

    /**
     * object where to store game global scole
     */
    data : {
        playerHealth: 100,
        currency: 100,
        wave: 1,
        enemies: 25
    },

    // a reference to the texture atlas
    texture : null
};

export default game;
