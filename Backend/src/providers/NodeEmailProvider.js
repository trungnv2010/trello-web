const {env} = require("~/config/environment");
const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.ADMIN_EMAIL_ADDRESS,
        pass: env.ADMIN_EMAIL_PASSWORD
    }
})

const sendEmail = async (recipientEmail, customSubject, customHtmlContent) => {
    try {
        return await transporter.sendMail({
            from: {
                name: env.ADMIN_EMAIL_NAME,
                address: env.ADMIN_EMAIL_ADDRESS
            },
            to: recipientEmail,
            subject: customSubject,
            html: customHtmlContent
        })
    } catch (error) {
        throw error
    }
}

export const NodeEmailProvider = {
    sendEmail
}