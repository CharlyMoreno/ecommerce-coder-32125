const productService = require('../services/productos.services')

const {logger} = require('../utils/logger')
const {checkValidation} = require('../middleware/validation.middleware');

const ValidationError = require('../utils/exceptions/validation.exceptions')

const getAllProducts = async (req,res) => {
    try{
        const productos = await productService.getAll();
        res.status(200).json(productos);
    }
    catch(err){
        logger.error(err)
    }
}

const saveProduct = async (req,res) => {
    try{
        checkValidation(req)
        const productoObject = req.body;
        const productoId = await productService.save(productoObject);
        res.status(200).json(productoId);
    }
    catch(error){
        if(error instanceof ValidationError) res.status(error.status).json(error.data)
        else{
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
}
const getProductById = async (req,res) => {
    try{
        if(req.params.id){
            const producto = await productService.getById(req.params.id);
            if(producto) res.status(200).json(producto);
            else res.status(404).json({"error":"Producto not found."})
        }
        else{
            res.status(404).json({"error":"Debe ingresar un id válido."})
        }
    }
    catch(err){
        logger.error(err)
    }
}

const updateProduct = async (req,res) => {
    try{
        if(req.params.id && req.body){
            const producto = await productService.update(req.params.id,req.body);
            if(producto) res.status(200).json(producto);
            else res.status(404).json({"error":"Producto not found."})
        }
        else{
            res.status(404).json({"error":"Debe ingresar un id y un body valido."})
        }
    }
    catch(err){
        logger.error(err)
    }
}

const deleteProductById = async (req,res) => {
    try{
        if(req.params.id){
            const producto = await productService.deleteById(req.params.id);
            if(producto) res.status(200).json(producto);
            else res.status(404).json({"error":"Producto not found."})
        }
        else{
            res.status(404).json({"error":"Debe ingresar un id válido."})
        }
    }
    catch(err){
        logger.error(err)
    }
}

module.exports = {getAllProducts,saveProduct,getProductById,updateProduct,deleteProductById}