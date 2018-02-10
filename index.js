var oled = require('./oled');
var font = require('oled-font-5x7');

var opts = {
  width: 128,
  height: 64,
  address: 60
};

var oled = new oled(opts);

oled.turnOnDisplay();

console.log('display on');

oled.clearDisplay();

console.log('dispaly clear');

oled.setCursor(1, 1);
oled.writeString(font, 1, 'Good morning.', 1, true);
