const nodemailer = require("nodemailer");

const sendEmail = async (options) => {

    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        host: "smtp.gmail.com",//service being used
        auth: {
            user: "virtualfyp2022@gmail.com",//email
            pass: "Dawar123@",//password
        },
    });

    const message = {
        from: "virtualfyp2022@gmail.com", //from email
        to: options.email,
        subject: options.subject,
        text: options.message,
    };//object wraps up the parameters


    await transporter.sendMail(message); //function that sends the email
};

module.exports = sendEmail;