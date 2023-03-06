const OrdenesDaoFactory = require("../daos/factory/ordenes.daoFactory");
const ordenesDao = OrdenesDaoFactory.getDao();

const {logger} = require('../utils/logger')

const {asDto} = require('../dto/ordenes.dto')

// function asDto(orden){
//     return orden;
// }

const save = async (data) => {
    try{
        const orden = await ordenesDao.save(data);
        return asDto(orden);
    }
    catch(err){
        logger.error(err);
    }
}

const getOrdenesByUser = async (user) => {
    const ordenes = await ordenesDao.getOrdenesByUser(user);
    return asDto(ordenes);
}

const getOrdenesByID = async (user) => {
    const ordenes = await ordenesDao.getOrdenesByID(user);
    return asDto(ordenes);
}

module.exports = {save,getOrdenesByUser,getOrdenesByID}
