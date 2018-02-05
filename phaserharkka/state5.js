var accel = 600;

demo.state5 = function(){};
demo.state5.prototype = {
  preload: function(){
    game.load.image('platform','../../assets/platform.png');
  },
  create: function(){
    addChangeStateEventListeners();

    hero = game.add.sprite(centerX, 500, 'hero');
    hero.scale.setTo(3);
    platform = game.add.sprite(0,800,'platform');
    platformGroup = game.add.group();
    platformGroup.create(650,400,'platform');
    platformGroup.create(1350,400,'platform');

    game.physics.enable([hero, platform, platformGroup]);

    hero.body.gravity.y = 500;
    hero.body.bounce.y = 0.3;
    hero.body.drag.x = 400;
    hero.body.collideWorldBounds = true;

    platform.body.immovable = true;
    platformGroup.setAll('body.immovable', true);
  },
  update: function(){
    game.physics.arcade.collide(hero, [platform, platformGroup]);
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      hero.body.acceleration.x = -accel;
    } else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      hero.body.acceleration.x = accel;
    } else {
      hero.body.acceleration.x = 0;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      hero.body.velocity.y = -300;
    }

  }
}