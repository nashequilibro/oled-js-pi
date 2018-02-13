## HowTo:

[Article on steemit](https://steemit.com/monero/@nashequilibro/howto-monero-node-behind-tor-with-oled-display-on-a-raspberry-pi)

Update: to make it totally plug and play add 

`_IP=$(hostname -I)`
`ipv4=${_IP%% *}`

to both startup and startupmon scripts and replace your ip address with `$ipv4`.

Now you can just plug it into a Lan and it will boot and run.
On the local Network you can access the demon through the ip shown on the OLED display.

To make it remotely accessible on the Tor network you can follow [Monero: How to connect a wallet to a Tor onion service node](https://garlicgambit.wordpress.com/2017/01/15/monero-how-to-connect-wallet-to-tor-onion-service-node/)!

### Monitor your monerod on oled-display for raspberry pi

Some issues cleaned up to make a new pi run with the oled-js-pi driver.

Edit opts in index.js if you run a different setup than a standard pi 3 with oled over i2c.

```javascript
var opts = {
  width: 128,
  height: 64,
  address: 60, // run i2c-detect to find hexvalue
  device_address: 1 // 0 for old pi
};
```

### Installing OLED display

Wire up or solder the Display to your Raspberry and then follow the [adafruit tutorial](https://learn.adafruit.com/adafruits-raspberry-pi-lesson-4-gpio-setup/configuring-i2c) to set it up.

### Install script

```javascript
git clone https://github.com/nashequilibro/pi-oled-monero
cd pi-oled-monero
npm install
node index xxx.xxx.xxx.xx // your monerod daemon ip
```

And the display should be showing you the time and after successfully connecting to the daemon a status and blockheight. Updating once a minute.
