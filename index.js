var oled = require('./oled');
var font = require('oled-font-5x7');
var moment = require('moment');
var nodeCleanup = require('node-cleanup');

var request = require('request');

var time =  ;
var status = 'loading...';
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
  request.post(options, function (error, response, body) {
    const data = JSON.parse(body)
    httpError = 'none';
    if (error) {
      throw new Error(error)
    }
    try {
      status = JSON.stringify(data.result.status);
      blockHeight = JSON.stringify(data.result.count);
      console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': Requested blockheight from ' + process.argv[2] + ', -> ' + data.result.count);
    } catch (e) {
      console.log(e);
    }
  });
}, 60000);

setInterval(function () {
  oled.clearDisplay();
  oled.update();
  oled.setCursor(1, 1);
  oled.writeString(font, 1, moment().format('MMM Do YY, h:mm:ss a'), 1, true);
  oled.setCursor(1, 21);
  oled.writeString(font, 1, process.argv[2], 1, true);
  oled.setCursor(1, 35);
  oled.writeString(font, 1, 'status: ' + status || 'error', 1, true);
  oled.setCursor(1, 49);
  oled.writeString(font, 1, blockHeight || 'error', 1, true);
  oled.update();
}, 1000);

nodeCleanup(function (exitCode, signal) {
  oled.clearDisplay();
  oled.writeString(font, 1, 'Monerod mon exited with exitcode: ' + exitCode, 1, true);
  oled.update();
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': Monero display exited with exitcode: ' + exitCode);
  });
