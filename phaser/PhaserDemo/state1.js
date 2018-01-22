var cursors, vel = 500, obstacles;

demo.state1 = function(){};
demo.state1.prototype = {
  preload: function(){
    game.load.tilemap('field', 'assets/tilemaps/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('basictiles', 'assets/tiles/basictiles.png');
    game.load.spritesheet('hero', 'assets/sprites/characters.png', 33, 36);

  },
  create: function(){
    addChangeStateEventListeners();
    var map = game.add.tilemap('field');
    map.addTilesetImage('basictiles');

    var grass = map.createLayer('Grass');
    obstacles = map.createLayer('Obstacles');

    hero = game.add.sprite(200, 200,'hero');
    hero.scale.setTo(2,2);
    game.physics.enable(hero);

    map.setCollisionBetween(16,21,true, 'Obstacles');

    cursors = game.input.keyboard.createCursorKeys();
  },
  update: function(){
    game.physics.arcade.collide(hero, obstacles);
    if(cursors.up.isDown) {
      hero.body.velocity.y = -vel;
    } else if (cursors.down.isDown) {
      hero.body.velocity.y = vel;
    } else {
      hero.body.velocity.y = 0;
    }

    if (cursors.right.isDown) {
      hero.body.velocity.x = vel;
    } else if (cursors.left.isDown) {
      hero.body.velocity.x = -vel;
    } else {
      hero.body.velocity.x = 0;
    }
  }
}