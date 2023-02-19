const ProductosDaoFactory = require("../daos/factory/productos.daoFactory");
const productosDao = ProductosDaoFactory.getDao();

// const {asDto} = require('../dto/producto.dto')

function asDto(producto){
    return producto;
}

const getAll = async () => {
    try{
        const productos = await productosDao.getAll();
        return asDto(productos);
    }
    catch(err){
        console.log(err);
    }
}

const save = async (product) => {
    try{
        const producto = await productosDao.save(product);
        return asDto(producto);
    }
    catch(err){
        console.log(err);
    }
}

const getById = async (id) => {
    try{
        const producto = await productosDao.getById(id);
        if(producto) return asDto(producto);
        else return null;
    }
    catch(err){
        console.log(err);
    }
}

const update = async (id,product) => {
    try{
        const producto = await productosDao.update(id,product);
        if(producto) return asDto(producto);
        else return null;
    }
    catch(err){
        console.log(err);
    }
}

const deleteById = async (id) => {
    try{
        const producto = await productosDao.deleteById(id);
        if(producto) return asDto(producto);
        else return null;
    }
    catch(err){
        console.log(err);
    }
}

module.exports = {getAll,save,getById,update,deleteById}