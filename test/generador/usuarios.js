const {faker} = require('@faker-js/faker')
faker.locale = 'es'
// nombre:String,
// username:String,
// password:String,
// email:String,
// numeroTel:String,
// direccion:String,
// pais:String,
// fotoPerfil:String

function generar() {
    const usuario = {
        "nombre":faker.name.fullName(),
        "username":faker.internet.userName(),
        "password":faker.internet.password(),
        "email":faker.internet.email(),
        "numeroTel":faker.phone.number('+549##########')
    }
    return usuario
}

module.exports = {
    generar
}


console.log(generar())