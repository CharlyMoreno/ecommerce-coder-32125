//___________________________________________  CONFIG  _________________________________________________ //
const config = require('../../utils/config')
//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('../../utils/logger')

const CarritosDaoMongoDB = require("../../daos/carritos/carritos.mongodb");

const opcion = config.CARRITOS_PERSISTENCIA
let dao
switch (opcion) {
    case 'MongoDB':
        dao = CarritosDaoMongoDB.getInstance()
        break
    default:
        logger.error(` ATENCION: El método ${opcion} para "CARRITOS" no está implementado. Por lo que se ejecutará por defecto la persistencia en MongoDB. `)
        dao = CarritosDaoMongoDB.getInstance()
}

module.exports = class CarritosDaoFactory {
    static getDao() {
        return dao
    }
}
