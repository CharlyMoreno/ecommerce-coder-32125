const MensajesDaoFactory = require("../daos/factory/mensajes.daoFactory");
const mensajesDao = MensajesDaoFactory.getDao();

const {logger} = require('../utils/logger')

const {asDto} = require('../dto/mensajes.dto')

// function asDto(mensaje){
//     return mensaje;
// }

const getMensajesByEmail = async (email) => {
    const mensajes = await mensajesDao.getMensajesByEmail(email)
    return asDto(mensajes);
}

const guardarMensaje = async (data,idUser) => {
    const mensaje = {
        timestamp: new Date(),
        texto: data.texto,
        tipo: 'usuario',
        user: idUser
    }

    const mensajeGuardado = await mensajesDao.save(mensaje);
    return asDto(mensajeGuardado);
}

const getAllMensajes = async () => {
    const mensajes = await mensajesDao.getAllMensajes()
    return asDto(mensajes)
}

module.exports = {guardarMensaje,getMensajesByEmail,getAllMensajes}