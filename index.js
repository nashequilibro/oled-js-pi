var oled = require('./oled');
var font = require('oled-font-5x7');
var moment = require('moment');

var opts = {
  width: 128,
  height: 64,
  address: 60
};

var oled = new oled(opts);

oled.turnOnDisplay();

console.log('display on');

oled.clearDisplay();
oled.update();

console.log('display clear');

setTimeout(function () {
  oled.clearDisplay();
  oled.setCursor(1, 1);
  oled.writeString(font, 1, moment().format('MMMM Do YYYY, h:mm:ss a'), 1, true);
  oled.update();
}, 1000);
