const jwt = require('jsonwebtoken')
const config = require('./config')

const clave_jwt = new TextEncoder().encode(config.SECRET)

function generateToken(user) {
    const token = jwt.sign(
        { 
            username: user.username,
            idUser: user._id 
        }, 
        clave_jwt, 
        { 
            expiresIn: 60 * 60
        }
    );
    return token;
}

module.exports = { generateToken }
