
// Treated as spam
var sendmail = require('sendmail')();
 
sendmail({
    from: 'no-reply@notify.me',
    to: 'joenil@influex.com',
    subject: 'test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.log('--------------------------------')
    console.dir(reply);
});