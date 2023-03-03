const UsuariosDaoFactory = require("../daos/factory/users.daoFactory");
const usuariosDao = UsuariosDaoFactory.getDao();

const UnauthorizedException = require('../utils/exceptions/auth.exceptions')
const {generateToken} = require('../utils/generateToken')
const {enviarMailRegister} = require('../utils/emails/register.email')
const bCrypt = require('bcrypt');

function createHash(password) {
    return bCrypt.hashSync(
        password,
        bCrypt.genSaltSync(10),
        null);
}

const register = async (user) => {
    const isUsernameExists = await usuariosDao.getByUsername(user.username)
    if(!isUsernameExists) {
        const usuario = {
            nombre:user.nombre,
            username:user.username,
            password: createHash(user.password),
            email:user.email,
            numeroTel: user.numeroTel,
            direccion:user.direccion,
            pais:user.pais,
            fotoPerfil: user.fotoPerfil
        }
        await usuariosDao.save(usuario)
        enviarMailRegister(usuario)
    }
    else throw new UnauthorizedException("Ya existe un usuario con ese username")
}

const login = async (username,password) =>{
    const user = await usuariosDao.getByUsername(username)
    const validPassword = user === null ? false : await bCrypt.compare(password,user.password)
    if(validPassword){
        const jwtUser = generateToken(user)
        return jwtUser
    }
    else throw new UnauthorizedException("Username o Password incorrecta")
}

module.exports = {register,login}

