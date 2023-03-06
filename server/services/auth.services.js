const UsuariosDaoFactory = require("../daos/factory/users.daoFactory");
const usuariosDao = UsuariosDaoFactory.getDao();

const UnauthorizedException = require('../utils/exceptions/auth.exceptions')
const {generateToken} = require('../utils/generateToken')
const {enviarMailRegister} = require('../utils/emails/register.email')
const bCrypt = require('bcrypt');

const {asDto} = require('../dto/user.dto')

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

const deleteUserByUsername = async (username) => {
    const deleteUser = await usuariosDao.deleteUserByUsername(username)
    return deleteUser
}

const getUserById = async (id) => {
    const user = await usuariosDao.getById(id)
    return asDto(user)
}

module.exports = {register,login,deleteUserByUsername,getUserById}

