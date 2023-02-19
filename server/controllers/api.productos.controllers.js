const productService = require('../services/productos.services')

const getAllProducts = async (req,res) => {
    try{
        const productos = await productService.getAll();
        res.status(200).json(productos);
    }
    catch(err){
        console.log(err)
    }
}

const saveProduct = async (req,res) => {
    try{
        const productoObject = req.body;
        const productoId = await productService.save(productoObject);
        res.status(200).json(productoId);
    }
    catch(err){
        console.log(err)
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
        console.log(err)
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
        console.log(err)
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
        console.log(err)
    }
}

module.exports = {getAllProducts,saveProduct,getProductById,updateProduct,deleteProductById}