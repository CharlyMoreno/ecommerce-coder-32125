const { createTransport } = require("nodemailer")

const config = require('../config')
const {logger} = require('../logger')

const transporter = createTransport({
    service:'gmail',
    port:587,
    auth:{
        user:config.EMAIL_ADMIN,
        pass:config.PASS_EMAIL_ADMIN
    }
});


async function sendEmail(mailOptions){
    try{
        const info = await transporter.sendMail(mailOptions)
        console.log(`Email enviado correctamente a ${mailOptions.to} `)
        return info;
    }
    catch(err){
        logger.error(err)
    }
}

module.exports = {sendEmail}
