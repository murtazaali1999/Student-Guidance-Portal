const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        host: "smtp.gmail.com",//service being used
        auth: {
            user: "",//email
            pass: "",//password
        },
    });

    const message = {
        from: "", //from email
        to: options.email,
        subject: options.subject,
        text: options.message,
    };//object wraps up the parameters


    await transporter.sendMail(message); //function that sends the email
};

module.exports = sendEmail;