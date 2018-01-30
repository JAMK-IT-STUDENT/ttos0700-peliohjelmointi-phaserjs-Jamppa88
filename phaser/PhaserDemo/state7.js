var
  arrow,
  startPointX,
  startPointY,
  endPointX,
  endPointY,
  swipeDirection,
  leeway = 10;

demo.state7 = function(){};
demo.state7.prototype = {
  preload: function(){
    game.load.image('arrow', './assets/sprites/arrow.png');
  },
  create: function(){
    game.stage.backgroundColor = '#ffffff';
    addChangeStateEventListeners();

    arrow = game.add.sprite(centerX, centerY, 'arrow');
    arrow.anchor.setTo(0.5);
    game.input.onDown.add(this.startSwipe);
    game.input.onUp.add(this.getSwipeDirection);
  },
  update: function(){},
  startSwipe: function() {
    startPointX = game.input.x;
    startPointY = game.input.y;
  },
  getSwipeDirection: function() {
    endPointY = game.input.y;
    endPointX = game.input.x;

    if (Math.abs(endPointY - startPointY) < leeway && Math.abs(endPointX - startPointX) < leeway) {
      return false;
    }

    if (Math.abs(endPointY - startPointY) <  Math.abs(endPointX - startPointX)) {
      console.log('horizontal');
      if (endPointX > startPointX) {
        swipeDirection = 0;
      } else {
        swipeDirection = 180;
      }
    } else {
      console.log('vertical');
      if (endPointY > startPointY) {
        swipeDirection = 90;
      } else {
        swipeDirection = 270;
      }
    }

    arrow.angle = swipeDirection;
  }
}