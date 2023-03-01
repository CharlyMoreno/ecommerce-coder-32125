const OrdenesDaoFactory = require("../daos/factory/ordenes.daoFactory");
const ordenesDao = OrdenesDaoFactory.getDao();

const {logger} = require('../utils/logger')

// const {asDto} = require('../dto/producto.dto')

function asDto(orden){
    return orden;
}

const save = async (data) => {
    try{
        const orden = await ordenesDao.save(data);
        return asDto(orden);
    }
    catch(err){
        logger.error(err);
    }
}

module.exports = {save}
