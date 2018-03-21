var oled = require('./oled');
var font = require('oled-font-5x7');
var moment = require('moment');
var nodeCleanup = require('node-cleanup');

var request = require('request');

var status = '... ';
var netWorkheight = '... ';
var blockHeight = '... ';

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
  body: JSON.stringify({"jsonrpc":"2.0","id":"0","method":"get_info"})
};

setInterval(function () {
  request.post(options, function (error, response, body) {
    if (error) {
      status = 'error';
      blockHeight = 'retrying...'
      console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': Requested blockheight from ' + process.argv[2] + ', -> ' + error);
    } else {
      try {
        const data = JSON.parse(body)
        status = JSON.stringify(data.result.status);
        netWorkheight = JSON.stringify(data.result.height);
        blockHeight = JSON.stringify(data.result.target_height - 1);
        console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': Requested blockheight from ' + process.argv[2] + ', -> ' + data.result.count);
      } catch (e) {
        console.log(e);
      }
    }
  });
}, 60000);

function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}

setInterval(function () {
  oled.clearDisplay();
  oled.setCursor(1, 1);
  oled.writeString(font, 1, moment().format('h:mm:ss a'), 1, true);
  oled.setCursor(1, 12);
  oled.writeString(font, 1, process.argv[2], 1, true);
  oled.setCursor(1, 24);
  oled.writeString(font, 1, 'status: ' + (status || 'error'), 1, true);
  oled.setCursor(1, 36);
  oled.writeString(font, 1, roundToTwo((blockHeight - netWorkheight) / 30) || '... ' + 'h behind', 1, true);
  oled.setCursor(1, 48);
  oled.writeString(font, 1, netWorkheight || 'error', 1, true);
  oled.writeString(font, 1, '/', 1, true);
  oled.writeString(font, 1, blockHeight || 'error', 1, true);
}, 1000);

nodeCleanup(function (exitCode, signal) {
  oled.turnOffDisplay();
  console.log(moment().format('MMMM Do YYYY, h:mm:ss a') + ': Monero display exited with exitcode: ' + exitCode);
  });
