// const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
var fs = require("fs");
const Handlebars = require("handlebars");
let transporter;
let img = "../public/img/logo.png";
var readHTMLFile = function (path, callback) {
  fs.readFile(path, { encoding: "utf-8" }, function (err, html) {
    if (err) {
      callback(err);
    } else {
      callback(null, html);
    }
  });
};
transporter = nodemailer.createTransport({
  host: process.env.smtphost,
  port: parseInt(process.env.smtpport),
  secure: parseInt(process.env.secure),
  auth: {
    user: process.env.service_mail,
    pass: process.env.service_password,
  },
  // tls: {
  //   rejectUnauthorized: false, // Bypass certificate validation (not recommended for production)
  // },
});

const sendActivationMail = function (email, name, confirmationCode) {
  // var linka = prod_url_activate;
  readHTMLFile(__dirname + "/activate.html", function (err, html) {
    if (err) {
      console.log("error reading file", err);
      return;
    }
    var template = Handlebars.compile(html);
    var replacements = {
      taskOnwer: name,
      link: confirmationCode,
      img: img,
    };
    var htmlToSend = template(replacements);
    let mailOptions = {
      from: process.env.service_mail,
      to: email,
      subject: "Account Verification",
      html: htmlToSend,
      //getActivationMailTemplate(username, link),
      text: "",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("message sent: %s\n", info.response);
      }
    });
  });
};
const sendNewMessageMail = function (name, email, message) {
  // var linka = prod_url_activate;
  readHTMLFile(__dirname + "/sendMessage.html", function (err, html) {
    if (err) {
      console.log("error reading file", err);
      return;
    }
    var template = Handlebars.compile(html);
    var replacements = {
      taskOnwer: name,
      // link: confirmationCode,
      img: img,
    };
    var htmlToSend = template(replacements);
    let mailOptions = {
      from: process.env.service_mail,
      to: email,
      subject: message,
      html: htmlToSend,
      text: "",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
      } else {
        console.log("message sent: %s\n", info.response);
      }
    });
  });
};

module.exports = {
  sendActivationMail,
  sendNewMessageMail,
};
