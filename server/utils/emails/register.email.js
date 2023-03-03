const {sendEmail} = require('../emails/sendEmail')

const generateHtml = (user) => {
    let html = `<h3>Muchas gracias por registrarte!</h3>
    <p>Hola ${user.nombre}! Esperemos que la plataforma sea de tu agrado.</p>
    `
    return html
}

const enviarMailRegister = async (user) => {
    const mailOptions = {
        from: "TechStore",
        to: user.email,
        subject: `Registro Exitoso!`,
        html: generateHtml(user),
    };
    await sendEmail(mailOptions)
}

module.exports = {enviarMailRegister}