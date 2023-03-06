const CategoriaServices = require('../services/categoria.services')

const {logger} = require('../utils/logger')

const getAllCategorias = async (req,res) => {
    try{
        const categorias = await CategoriaServices.getAll();
        res.status(200).json(categorias);
    }
    catch(err){
        logger.error(err)
    }
}

const saveCategoria = async (req,res) => {
    try{
        const categoriaObject = req.body;
        const categoriaId = await CategoriaServices.save(categoriaObject);
        res.status(200).json(categoriaId);
    }
    catch(error){
        res.status(500).json({"error":"Ocurrio un error"})
        logger.error(error)
    }
}
const getCategoriaByID = async (req,res) => {
    try{
        if(req.params.id){
            const categoria = await CategoriaServices.getById(req.params.id);
            if(categoria) res.status(200).json(categoria);
            else res.status(404).json({"error":"categoria not found."})
        }
        else{
            res.status(404).json({"error":"Debe ingresar un id válido."})
        }
    }
    catch(error){
        res.status(500).json({"error":"Ocurrio un error"})
        logger.error(error)
    }
}

const updateCategoria = async (req,res) => {
    try{
        if(req.params.id && req.body){
            const categoria = await CategoriaServices.update(req.params.id,req.body);
            if(categoria) res.status(200).json(categoria);
            else res.status(404).json({"error":"categoria not found."})
        }
        else{
            res.status(404).json({"error":"Debe ingresar un id y un body valido."})
        }
    }
    catch(error){
        res.status(500).json({"error":"Ocurrio un error"})
        logger.error(error)
    }
}

const deleteCategoriaByID = async (req,res) => {
    try{
        if(req.params.id){
            const categoria = await CategoriaServices.deleteById(req.params.id);
            if(categoria) res.status(200).json(categoria);
            else res.status(404).json({"error":"categoria not found."})
        }
        else{
            res.status(404).json({"error":"Debe ingresar un id válido."})
        }
    }
    catch(error){
        res.status(500).json({"error":"Ocurrio un error"})
        logger.error(error)
    }
}

module.exports = {getAllCategorias,saveCategoria,getCategoriaByID,updateCategoria,deleteCategoriaByID}