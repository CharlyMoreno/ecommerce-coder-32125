const {sendEmail} = require('./sendEmail')

const generateHtml = (carrito) => {
    let html = `<h1> Gracias por tu compra </h1>`

    carrito.productos.forEach(element => {
        const producto = element.producto
        html += `<p> ${element.cantidad} - ${producto.nombre} - $${producto.precio} - $${producto.precio * element.cantidad} </p>`
    });

    html += `<p> Esperemos que hayas tenido una buena atención</p> `
    
    return html
}

const enviarMailCompra = async (carrito) => {
    const mailOptions = {
        from: "TechStore",
        to: carrito.user.email,
        subject: `Gracias por su compra!`,
        html: generateHtml(carrito),
    };
    await sendEmail(mailOptions)
}

module.exports = {enviarMailCompra}