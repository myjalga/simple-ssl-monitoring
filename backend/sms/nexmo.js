
"use strict"

var Nexmo = require('nexmo');
 
var sms = {};

var formatMessage = (data) => {
return `
Hi Sir/Maam,

This is to inform you that the SSL certificate of the host ${data.host} will be expiring in ${data.expires} day/s.

Thanks,
VTT

`;
}

// 639565511970
sms.send = (data) => {
    if (!data.phone || data.phone == '') { return }

    var nexmo = new Nexmo({
        apiKey: '',
        apiSecret: ''
    }, {debug: true});
    
    nexmo.message.sendSms('', data.phone, formatMessage(data), function (err) {
        console.log('nexmo', err)
    })
}


module.exports = sms;
