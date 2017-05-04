

"use strict"

var _check = require('../ssl_checker/checker');

var addData = {};

addData.add = function (payload, callback) {

    var host = (payload.host) ? payload.host : null;
    var email = (payload.email) ? payload.email : null;
    var phone = (payload.phone) ? payload.phone : null;
    var manual = payload.manual;
    var start = (payload.start) ? new Date(payload.start) : null;
    var end = (payload.end) ? new Date(payload.end) : null;

    var data = {
        host: host,
        email: email,
        phone: phone,
        start: start,
        end: end,
        manual: manual,
        status: '',
        expires: '0',
        first: false,
        second: false,
        third: false
    }

    if (!manual) {
        _check.check(data.host, (hdata)=>{
            hdata = JSON.parse(hdata);
            if (hdata) {
                data.start = formatDate(hdata.valid_from);
                data.rStart = hdata.valid_from,
                data.end = formatDate(hdata.valid_to);
                data.rEnd = hdata.valid_to
                data.expires = String(hdata.expires);
                data.status = String('active');
            } 
            callback(data);
        })
    } else {
        var dat = _check.expiresOn({valid_from: data.start, valid_to: data.end}, data.host);
        dat = JSON.parse(dat);
        data.start = formatDate(dat.valid_from);
        data.rStart = dat.valid_from;
        data.end = formatDate(dat.valid_to);
        data.rEnd = dat.valid_to;
        data.expires = String(dat.expires);
        data.status = String('active');
        callback(data)
    }
}

function formatDate(dat) {
    var mon = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    var date = new Date(dat);
    return `${date.getDate()} ${mon[date.getMonth()]} ${date.getUTCFullYear()}`
}


module.exports = addData;