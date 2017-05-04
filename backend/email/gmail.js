

"use strict"

var gmail = {};

var _mailer = require('nodemailer');
var _transporter = _mailer.createTransport({
    service: 'Gmail',
    auth: {
        user: '',
        pass: ''
    },
    debug: true
});


var formatMessage = (data) => {
return `
Hi Sir/Maam,

This is to inform you that the SSL certificate of the host ${data.host} will be expiring in ${data.expires} day/s.

Thanks,
VTT
`;
}

gmail.send = (data) => {
    if (!data) { return; } 
    var message = {
        from: 'SSL Monitor <vtt.app.1@gmail.com>',
        to: data.email,
        subject: 'SSL Monitor reminder',
        text: formatMessage(data)
    };

    _transporter.sendMail(message, (error, info) =>{
        if (error) {
            console.log('Error occurred', error);
            console.log(error.message);
            return;
        }
        console.log('Message sent successfully!');
        console.log('Server responded with "%s"', info.response);
        transporter.close();
    });
}

module.exports = gmail;