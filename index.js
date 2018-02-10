var oled = require('./oled');
var font = require('oled-font-5x7');
var moment = require('moment');

var request = require('request');

console.log(process.argv);

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

var options = {
  url: 'http://' + process.argv[2] + ':18081/json',
  headers: {
    'content-type': 'application/json'
  },
  "jsonrpc":"2.0",
  "id":"0",
  "method":"getblockcount"
};

request.post(options, function (error, response, body) {
  console.log('error:', error); // Print the error if one occurred
  console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
  console.log('body:', body); // Print the HTML for the Google homepage.
});

setInterval(function () {
  oled.clearDisplay();
  oled.setCursor(1, 1);
  oled.writeString(font, 1, moment().format('MMMM Do YYYY, h:mm:ss a'), 1, true);
  oled.update();
}, 1000);
