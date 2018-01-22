var 
  barrel, 
  bullets, 
  velocity = 1000, 
  nextFire = 0, 
  fireRate = 200, 
  enemy, 
  bullet;

demo.state2 = function(){};
demo.state2.prototype = {
  preload: function(){
    game.load.image('base', 'assets/sprites/tankbase.png');
    game.load.image('turret', 'assets/sprites/tankturret.png');
    game.load.image('bullet', 'assets/sprites/bullet.png');
    game.load.spritesheet('man', 'assets/sprites/characters.png', 33,36);
  },
  create: function(){
    addChangeStateEventListeners();
    game.stage.backgroundColor = '#ffffff';

    var base = game.add.sprite(centerX, centerY, 'base');
    base.anchor.setTo(0.5);
    base.scale.setTo(0.3);

    bullets = game.add.group();
    bullets.enableBody = true;
    bullets.physicsBodyType = Phaser.Physics.ARCADE;
    bullets.createMultiple(50, 'bullet');
    bullets.setAll('checkWorldBounds', true);
    bullets.setAll('outOfBoundsKill', true);
    bullets.setAll('anchor.y', 0.5);
    bullets.setAll('scale.y', 2);
    bullets.setAll('scale.x', 2);

    barrel = game.add.sprite(centerX, centerY, 'turret');
    barrel.scale.setTo(0.3);
    barrel.anchor.setTo(0.2,0.5);

    enemy = game.add.sprite(100,centerY, 'hero');
    game.physics.enable(enemy);

    enemyGroup = game.add.group();
    enemyGroup.enableBody = true;
    enemyGroup.physicsBodyType = Phaser.Physics.ARCADE;

    for (var i = 0; i < 3; i++) {
      enemyGroup.create(1300, 300 * i + 100, 'hero');
    }
  },
  update: function(){
    barrel.rotation = game.physics.arcade.angleToPointer(barrel);
    if (game.input.activePointer.isDown) {
      this.fire();
    }

    game.physics.arcade.overlap(bullets, enemy, this.hitEnemy);
    game.physics.arcade.overlap(bullets, enemyGroup, this.hitGroup);
  },
  fire: function() {
    if (game.time.now > nextFire) {
      nextFire = game.time.now + fireRate;
      console.log('firing');
      bullet = bullets.getFirstDead();
      bullet.reset(barrel.x, barrel.y);
      game.physics.arcade.moveToPointer(bullet, velocity);

      bullet.rotation = game.physics.arcade.angleToPointer(bullet);

    }
  },
  hitEnemy: function() {
    console.log('hit');
    enemy.kill();
    bullet.kill();
  },
  hitGroup: function (b,e) {
    b.kill();
    e.kill();
  }
}