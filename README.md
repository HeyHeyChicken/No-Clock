<div align="center">

<img src="https://raw.githubusercontent.com/HeyHeyChicken/My-LaMetric-Time/main/resources/logo.png" width="300">
<br><br>

**My LaMetric Time** is a customizable clock, able to display all your notifications, made with Node.js.<br>

<br>

<img src="https://raw.githubusercontent.com/HeyHeyChicken/My-LaMetric-Time/main/resources/demo.gif">
</div>

<br>

Hey, I recently added animated icons 😀<br/>
<div align="center">
 <img src="https://raw.githubusercontent.com/HeyHeyChicken/My-LaMetric-Time/main/resources/clock.gif" width="100">
 <img src="https://raw.githubusercontent.com/HeyHeyChicken/My-LaMetric-Time/main/resources/smile.gif" width="100">
 <img src="https://raw.githubusercontent.com/HeyHeyChicken/My-LaMetric-Time/main/resources/poop.gif" width="100">
</div>

## Installation

1) Clone it directly from GitHub.
```
git clone https://github.com/HeyHeyChicken/My-LaMetric-Time.git
```
2) Install packages
```
cd My-LaMetric-Time
npm install
```

## Usage

1) Launch this command.
```
node index.js
```
2) If you start the launcher for the first time, it will generate you an API key used to send notifications to your device.<br/>

## Features

1) Your clock shows you the time, specifying the seconds or not, the day of the week and the day of the month.<br/>
2) You can ask it to display a notification with a POST request at http://localhost/notification.<br/>
You'll have to set the "api-key" attribute in the header.<br/>
Finaly, you'll have to set the body like this:
```json
{
    "icon": {
        "x": 1,
        "y": 1,
        "value": "hourglass"
    },
    "message": {
        "x": 11,
        "y": 1,
        "value": "8 minutesand 23   seconds  remaining"
    },
    "remaining_time": 5,
    "remaining_time": "https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/BsTwCwBHBjzwub4i4/audioblocks-bells-positive-sound_BKqfVgMUAvU_NWM.mp3"
}
```

## Compatibility

**My LaMetric Time** has only been officially tested on Chromium based browser and Android.

## License key

**The license key is obligatory.**

If you use **My LaMetric Time** for purposes not intended toward monetary compensation such as, but not limited to, teaching, academic research, evaluation, testing and experimentation, pass the phrase `'non-commercial-and-evaluation'` in the "/settings.json" file, as presented below:

```json
{
  "licenseKey": "non-commercial-and-evaluation"
}
```

The license key is validated in an offline mode.<br/>
No connection is made to any server.<br/>

<br>
<br>

Created by [Antoine Duval (HeyHeyChicken)](//antoine.cuffel.fr) with ❤ and ☕ (chocolate) in [Mesnil-Panneville](//en.wikipedia.org/wiki/Mesnil-Panneville).
