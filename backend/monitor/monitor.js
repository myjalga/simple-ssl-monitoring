
"use strict"
const EventEmitter = require('events');
var _mail = require('../email/gmail');
var _sms = require('../sms/nexmo');

var MIN1 = 60 * 1000;

var MINGRAN = 1;

var I = 1;

var _interval = I < MINGRAN ? MINGRAN : I;

var monitor = {};

var _cache = [];

monitor.start = function (cache) {
    _cache = cache;
    startMonitor();
}

monitor.update = function (cache) {
    _cache = cache;
}


function startMonitor () {
    console.log(`[ ${new Date()} ]`, JSON.stringify(_cache));

    _cache = _cache.map((data)=>{
        if (data.expires && Number(data.expires) < 7 && !data.first) {
            _mail.send(data);
            _sms.send(data);
            data.first = true;
        }
        return data;
    }, this);
    
    var x = calcTiming(_interval);
    setTimeout(function(){startMonitor();}, x);
}

function calcTiming(i) {
    var n = new Date();

    var m = i - (n.getMinutes() % i);

    return (m * MIN1) - (n.getSeconds() * 1000) - n.getMilliseconds();
}

module.exports = monitor;