const nodemailer = require("nodemailer")

const sendEmail = async (mailOptions) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASSWORD
        }
    })

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("Hata Çıktı Mail Gönderilemedi : ", error);
        }
        console.log("info : ", info);
        return true
    })
}

module.exports = sendEmail