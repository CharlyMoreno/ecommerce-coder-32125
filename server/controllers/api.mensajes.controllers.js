const {logger} = require('../utils/logger')

const MensajesServices = require('../services/mensajes.services')

const getMensajesByEmail = async (req,res) => {
    try{
        const email = req.params.email
        const mensajes = await MensajesServices.getMensajesByEmail(email)
        res.status(200).json(mensajes)
    }
    catch(error) {
        res.status(500).json({"error":"Ocurrio un error"})
        logger.error(error)
    }
}

const guardarMensaje = async (req,res) => {
    try{
        const data = req.body
        const mensaje = await MensajesServices.guardarMensaje(data, req.idUser)
        res.status(200).json(mensaje)
    }
    catch(error) {
        res.status(500).json({"error":"Ocurrio un error"})
        logger.error(error)
    }
}

module.exports = {getMensajesByEmail,guardarMensaje}