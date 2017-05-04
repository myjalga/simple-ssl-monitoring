

"use strict"

var _Checker = require('ssl-date-checker/src/Checker');
var _ResultFormatter = require('ssl-date-checker/src/formatters/ResultFormatter');
var https = require('https');
var _port = 443;


var checker = {};

checker.check = function (host, callback) {

    var option = {
        host: host,
        port: _port,
        method: 'GET'
    };

    var req = https.request(option, function (res) {
        var certificateInfo = res.connection.getPeerCertificate();

        var dateInfo = {
            valid_from: certificateInfo.valid_from,
            valid_to: certificateInfo.valid_to
        }
        var formatter = new _ResultFormatter('json');
        var result = formatter.format(host, dateInfo);
        callback(result);
    });

    req.on('error', (e)=>{
        callback(null)
    });

    req.end();
}

checker.expiresOn = function (dateInfo, host) {
    var formatter = new _ResultFormatter('json');
    var result = formatter.format(host, dateInfo);
    return result;
}


module.exports = checker;