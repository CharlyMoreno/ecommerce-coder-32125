//___________________________________________  CONFIG  _________________________________________________ //
const config = require('../../utils/config')
//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('../../utils/logger')

const MensajesMongoDB = require("../../daos/mensajes/mensajes.mongodb");

const opcion = config.MENSAJES_PERSISTENCIA
let dao
switch (opcion) {
    case 'MongoDB':
        dao = MensajesMongoDB.getInstance()
        break
    default:
        logger.error(` ATENCION: El método ${opcion} para "MENSAJES" no está implementado. Por lo que se ejecutará por defecto la persistencia en MongoDB. `)
        dao = MensajesMongoDB.getInstance()
}

module.exports = class MensajesDaoFactory {
    static getDao() {
        return dao
    }
}
