const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

//Env Load
dotenv.config();

const email = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "email@gmail.com",
    pass: "password",
  },
});

module.exports = email;
