var demo = {}, centerX = 1500 / 2, centerY = 1000 / 2, hero, speed = 8;
demo.state0 = function(){};
demo.state0.prototype = {
  preload: function(){
    game.load.spritesheet('hero', 'assets/sprites/characters.png', 33, 36);
    game.load.image('bg', 'assets/backgrounds/background0.png');
  },
  create: function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);
    addChangeStateEventListeners();
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.world.setBounds(0,0, 1920, 1080);

    var bg = game.add.sprite(0,0, 'bg');

    hero = game.add.sprite(centerX, centerY, 'hero');
    hero.anchor.setTo(0.5, 0.5);
    hero.scale.setTo(5,5);
    hero.animations.add('walk', [1,2,3,4]);

    game.physics.enable(hero);
    hero.body.collideWorldBounds = true;
    game.camera.follow(hero);
    game.camera.deadzone = new Phaser.Rectangle(centerX - 300, centerY -300, 600, 600);
  },
  update: function(){
    if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
      hero.x += speed;
      hero.scale.setTo(5,5);
      hero.animations.play('walk', 14, true);
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
      hero.x -= speed;
      hero.scale.setTo(-5,5);
      hero.animations.play('walk', 14, true);
    } else {
      hero.animations.stop('walk');
      hero.frame = 0;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
      hero.y -= speed;
      if (hero.y < 426) {
        hero.y = 426;
      }
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
      hero.y += speed;
    }
  }
}

function changeState(event, stateNum) {
  console.log('state' + stateNum);
  game.state.start('state' + stateNum);
}

function addKeyCallback(key, fn, args) {
  game.input.keyboard.addKey(key)
      .onDown.add(fn, null, null, args);
}

function addChangeStateEventListeners() {
  addKeyCallback(Phaser.Keyboard.ZERO, changeState, 0);
  addKeyCallback(Phaser.Keyboard.ONE, changeState, 1);
  addKeyCallback(Phaser.Keyboard.TWO, changeState, 2);
  addKeyCallback(Phaser.Keyboard.THREE, changeState, 3);
  addKeyCallback(Phaser.Keyboard.FOUR, changeState, 4);
  addKeyCallback(Phaser.Keyboard.FIVE, changeState, 5);
  addKeyCallback(Phaser.Keyboard.SIX, changeState, 6);
  addKeyCallback(Phaser.Keyboard.SEVEN, changeState, 7);
  addKeyCallback(Phaser.Keyboard.EIGHT, changeState, 8);
  addKeyCallback(Phaser.Keyboard.NINE, changeState, 9);
}