import Enemy from '../renderables/enemy.js';

// Inside your stage class or wherever you're setting up the level
class Level1 extends me.Stage {
    onResetEvent() {
        // Clear the world
        me.game.world.reset();

        // Add enemies to the world
        const onigiriEnemy = new Enemy(100, 50, { width: 32, height: 32, image: 'onigiri_image' }, 50, 4, 'Onigiri');
        const redVelvetEnemy = new Enemy(200, 50, { width: 32, height: 32, image: 'red_velvet_image' }, 200, 1, 'Red Velvet Cake');
        const coffeeEnemy = new Enemy(300, 50, { width: 32, height: 32, image: 'coffee_image' }, 100, 2, 'Coffee');

        // Add the enemies to the game world
        me.game.world.addChild(onigiriEnemy);
        me.game.world.addChild(redVelvetEnemy);
        me.game.world.addChild(coffeeEnemy);
    }
}

// export default ;
