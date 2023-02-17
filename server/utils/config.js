require('dotenv').config()

const PORT = process.env.PORT || 8080
const MONGOURL = process.env.MONGOURL
const SECRET = process.env.SECRET
const EMAIL_ADMIN = process.env.EMAIL_ADMIN
const PASS_EMAIL_ADMIN = process.env.PASS_EMAIL_ADMIN
const PAISES_PERSISTENCIA = process.env.PAISES_PERSISTENCIA || 'MongoDB'
const PRODUCTOS_PERSISTENCIA = process.env.PRODUCTOS_PERSISTENCIA || 'MongoDB'
const CARRITOS_PERSISTENCIA = process.env.CARRITOS_PERSISTENCIA || 'MongoDB'
const USERS_PERSISTENCIA = process.env.USERS_PERSISTENCIA || 'MongoDB'

module.exports = {
    PORT,
    MONGOURL,
    SECRET,
    EMAIL_ADMIN,
    PASS_EMAIL_ADMIN,
    PAISES_PERSISTENCIA,
    PRODUCTOS_PERSISTENCIA,
    CARRITOS_PERSISTENCIA,
    USERS_PERSISTENCIA,
    
}