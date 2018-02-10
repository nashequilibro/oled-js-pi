var oled = require('./oled');
var font = require('oled-font-5x7');
var moment = require('moment');

var request = require('request');

var time =  moment().format('MMMM Do YYYY, h:mm:ss a');
var statusCode = '';
var status = 'loading...';
var httpError = 'none';
var blockHeight = 'loading...'

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
  url: 'http://' + process.argv[2] + ':18081/json_rpc',
  headers: {
    'content-type': 'application/json'
  },
  body: JSON.stringify({"jsonrpc":"2.0","id":"0","method":"getblockcount"})
};

setInterval(function () {
  time = moment().format('MMMM Do YYYY, h:mm:ss a');
}, 50);

setInterval(function () {
  request.post(options, function (error, response, body) {
    const data = JSON.parse(body)
    httpError = 'none';
    if (error) httpError = error;
    try {
      statusCode = response.statusCode;
      status = data.result.status;
      blockHeight = data.result.count;
      console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': Requested blockheight from ' + process.argv[2] + ', -> ' data.result.count);
    } catch (e) {
      console.log(e);
    }
  });
}, 60000);

setInterval(function () {
  oled.clearDisplay();
  oled.setCursor(1, 1);
  oled.writeString(font, 1, time, 1, true);
  oled.setCursor(1, 25);
  oled.writeString(font, 1, 'status: ' + status || 'error', 1, true);
  oled.setCursor(1, 45);
  oled.writeString(font, 1, 'blockheight: ' + blockHeight || 'error', 1, true);
}, 1000);
