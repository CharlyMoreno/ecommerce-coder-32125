//___________________________________________  CONFIG  _________________________________________________ //
const config = require('../../utils/config')
//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('../../utils/logger')

const CategoriaDaoMongoDB = require("../categorias/categoria.mongodb");

const opcion = config.CARRITOS_PERSISTENCIA
let dao
switch (opcion) {
    case 'MongoDB':
        dao = CategoriaDaoMongoDB.getInstance()
        break
    default:
        logger.error(` ATENCION: El método ${opcion} para "CATEGORIAS" no está implementado. Por lo que se ejecutará por defecto la persistencia en MongoDB. `)
        dao = CategoriaDaoMongoDB.getInstance()
}

module.exports = class CategoriaDaoFactory {
    static getDao() {
        return dao
    }
}
