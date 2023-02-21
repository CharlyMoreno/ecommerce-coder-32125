//___________________________________________  CONFIG  _________________________________________________ //
const config = require('../../utils/config')
//___________________________________________  LOGS  _________________________________________________ //
const {logger} = require('../../utils/logger')

const UsersDaoMongoDB = require("../../daos/users/users.mongodb");

const opcion = config.USERS_PERSISTENCIA

let dao
switch (opcion) {
    case 'MongoDB':
        dao = UsersDaoMongoDB.getInstance()
        break
    default:
        logger.error(` ATENCION: El método ${opcion} para "USERS" no está implementado. Por lo que se ejecutará por defecto la persistencia en MongoDB. `)
        dao = UsersDaoMongoDB.getInstance()
}

module.exports = class UsersDaoFactory {
    static getDao() {
        return dao
    }
}
