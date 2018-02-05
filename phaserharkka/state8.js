var text;

WebFontConfig = {
  google: { families: ['Candal', 'Montserrat'] }
};

demo.state8 = function(){};
demo.state8.prototype = {
  preload: function(){
    game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
  },
  create: function(){
    game.stage.backgroundColor = '#39e6e6';
    addChangeStateEventListeners();

    text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vestibulum nulla nec tellus ultrices vulputate. Sed laoreet dui cursus libero facilisis, a accumsan dolor congue. Aliquam pulvinar imperdiet justo, et faucibus est. Sed ut volutpat ante, eu mollis elit. In tempus est vitae quam accumsan viverra. Proin tincidunt leo lacinia, luctus tortor ut, ultrices ligula. Vestibulum dictum in tellus at rhoncus.';
    
    this.spellOutText(100, 100, 1000, text, 40, 40, '#fff', 'Candal');
    this.spellOutText(100, 600, 1000, text, 40, 20, '#000', 'Montserrat');
  },
  update: function(){},
  spellOutText: function(x, y, width, text, fontSize, speed, fill, font) {
    var sentence = game.add.text(x,y,'', {fontSize: fontSize + 'px', fill: fill, font: font});
    var currentLine = game.add.text(10, 10, '', {fontSize: fontSize + 'px', fill: fill, font: font});
    currentLine.alpha = 0;
    var loop = game.time.events.loop(speed, addChar);

    var index = 0;

    function addChar() {
      sentence.text += text[index];
      currentLine.text += text[index];

      if (currentLine.width > width && text[index] == ' ') {
        sentence.text += '\n';
        currentLine.text = '';
      }
      if (index >= text.length - 1) {
        game.time.events.remove(loop);
        console.log('stop');
      }
      index++;
    }
  }
}