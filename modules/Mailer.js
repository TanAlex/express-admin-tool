'use strict';
const nodemailer = require('nodemailer');
const configs = require('../configs/configs');

var Mailer = {};
// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport(configs.mailOptions);

// setup email data with unicode symbols
let mailDefaultOptions = {
    from: '"BTV Support" <btv.sup@gmail.com>', // sender address
    to: 'btv.sup@gmail.com', // list of receivers
    subject: 'Yes Yes, send test', // Subject line
    text: 'Hello world?' // plain text body
};


Mailer.sendMail =  function(option){
  //var newArgs = Array.prototype.slice.call(arguments,0);
  var mailOptions = {};
  if (typeof option == "object"){
    mailOptions = Object.assign({}, mailDefaultOptions, option);
    
  }else{
    mailOptions = mailDefaultOptions;
  }
  //console.log('mailOptions', mailOptions);
  var self = this;
  var promise = new Promise( (resolve, reject) => {
    transporter.sendMail(mailOptions,function(error, ret){
      if (error) reject(error);
      resolve(ret);
    });
  });
  return promise;
}

module.exports = Mailer;
