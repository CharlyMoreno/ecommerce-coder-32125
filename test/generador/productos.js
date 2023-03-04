const {faker} = require('@faker-js/faker')
faker.locale = 'es'
// nombre:
// timestamp:
// precio:
// descripcion:
// codigo: 
// foto:
// stock:

const generarCodigo = (nombre) => {
    const randomNumber = faker.commerce.price(100, 999, 0)
    const threeFirstLetter = nombre.slice(0,3).toUpperCase()
    return `${threeFirstLetter}-${randomNumber}`
}
function generar() {
    const nombre = faker.commerce.product()
    const producto = {
        "nombre":nombre,
        "timestamp": new Date(),
        "precio":faker.commerce.price(100,10000),
        "descripcion":faker.commerce.productDescription(),
        "stock":faker.commerce.price(1, 200, 0),
        "foto": faker.image.abstract(720,480,true),
        "codigo":generarCodigo(nombre)
    }
    return producto
}

module.exports = {
    generar
}