// const mongoose = require('mongoose');
const nodemailer = require("nodemailer");
var fs = require("fs");
const ejs = require("ejs");
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
  host: "mail.limebowgifts.com",
  port: 465,
  secure: true,
  auth: {
    user: "sales@limebowgifts.com",
    pass: "%$Iz@u;AMjx,",
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
const sendInvoice = function (items, email, total, invoiceNumber, invoiceDate) {
  fs.readFile(__dirname + "/invoice.ejs", "utf-8", function (err, data) {
    if (err) {
      console.log("Error reading file", err);
      return;
    }

    // Compile the EJS template with data
    const renderedHtml = ejs.render(data, {
      invoiceNumber: invoiceNumber,
      items: items,
      invoiceTotal: total,
      date: invoiceDate,
    });
    let mailOptions = {
      from: "Limebow Sales <sales@limebowgifts.com>",
      to: email,
      subject: `Receipt number. ${invoiceNumber}`,
      html: renderedHtml,
      text: "Success",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("messsage sent: %s\n", info.response);
      }
    });
  });
};
const subscribtionConfirmation = function (promocode, email) {
  fs.readFile(__dirname + "/subscribe.ejs", "utf-8", function (err, data) {
    if (err) {
      console.log("Error reading file", err);
      return;
    }

    // Compile the EJS template with data
    const renderedHtml = ejs.render(data, {
      promocode,
    });
    let mailOptions = {
      from: "Limebow Sales <sales@limebowgifts.com>",
      to: email,
      subject: `Thank you for subscribing to our newsletters.`,
      html: renderedHtml,
      text: "Success",
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("messsage sent: %s\n", info.response);
      }
    });
  });
};

module.exports = {
  sendActivationMail,
  sendNewMessageMail,
  subscribtionConfirmation,
  sendInvoice,
};
