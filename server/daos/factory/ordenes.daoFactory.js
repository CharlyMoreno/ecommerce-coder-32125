//___________________________________________  CONFIG  _________________________________________________ //
const config = require('../../utils/config')
//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('../../utils/logger')

const OrdenesDaoMongoDB = require("../../daos/ordenes/ordenes.mongodb");

const opcion = config.ORDENES_PERSISTENCIA
let dao
switch (opcion) {
    case 'MongoDB':
        dao = OrdenesDaoMongoDB.getInstance()
        break
    default:
        logger.error(` ATENCION: El método ${opcion} para "ORDENES" no está implementado. Por lo que se ejecutará por defecto la persistencia en MongoDB. `)
        dao = OrdenesDaoMongoDB.getInstance()
}

module.exports = class CarritosDaoFactory {
    static getDao() {
        return dao
    }
}
