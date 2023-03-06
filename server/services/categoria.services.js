const CategoriaDaoFactory = require("../daos/factory/categoria.daoFactory");
const categoriaDao = CategoriaDaoFactory.getDao();

const {asDto} = require('../dto/categoria.dto')

const getAll = async () => {
    const categorias = await categoriaDao.getAll()
    return asDto(categorias)
}


const save = async (category) => {
    const categoriaObject = {
        nombre: category.nombre
    }
    const categoria = await categoriaDao.save(categoriaObject);
    return asDto(categoria);
}

const getById = async (id) => {
    const categoria = await categoriaDao.getById(id);
    if(categoria) return asDto(categoria);
    else return null;
}

const update = async (id,category) => {
    const categoria = await categoriaDao.update(id,category);
    if(categoria) return asDto(categoria);
    else return null;
}

const deleteById = async (id) => {
    const categoria = await categoriaDao.deleteById(id);
    if(categoria) return asDto(categoria);
    else return null;
}



module.exports = {getAll,save,getById,update,deleteById}