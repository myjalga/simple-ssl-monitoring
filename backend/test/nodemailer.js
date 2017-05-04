
"use strict"

var mail = require("nodemailer").mail;

mail({
    from: "Notify.Me ✔ <no-reply@notify.me>", // sender address
    to: "joenil@influex.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world ✔", // plaintext body
    html: "<b>Hello world ✔</b>" // html body
});