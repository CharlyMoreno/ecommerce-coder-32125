//___________________________________________  CONFIG  _________________________________________________ //
const config = require('../../utils/config')
//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('../../utils/logger')

const ProductosDaoMongoDB = require("../../daos/productos/productos.mongodb");

const opcion = config.PRODUCTOS_PERSISTENCIA

let dao
switch (opcion) {
    case 'MongoDB':
        dao = ProductosDaoMongoDB.getInstance()
        break
    default:
        logger.error(` ATENCION: El método ${opcion} para "PRODUCTOS" no está implementado. Por lo que se ejecutará por defecto la persistencia en MongoDB. `)
        dao = ProductosDaoMongoDB.getInstance()
}

module.exports = class ProductosDaoFactory {
    static getDao() {
        return dao
    }
}
