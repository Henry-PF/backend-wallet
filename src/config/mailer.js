const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GOOGLE_MAIL,
        pass: process.env.GOOGLE_MAIL_PASS
    }
});

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = {
            from: '"SmartPay" <pf.henry.wallet@gmail.com>',
            to,
            subject,
            text,
            html,
        };

        const result = await transporter.sendMail(info);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = sendEmail;
