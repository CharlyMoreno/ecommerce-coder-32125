const carritoService = require('../services/carrito.services')
const CarritoException = require('../utils/exceptions/carrito.exceptions')

const {logger} = require('../utils/logger')


const getCarritoByUser = async (req,res) => {
    try{
        const carrito = await carritoService.getCarritoByUser(req.idUser)
        res.status(200).json(carrito)
    }
    catch(error){
        if(error instanceof CarritoException) res.status(error.status).json(error.message)
        else{
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
}

const addProduct = async (req,res) => {
    try{
        const idProducto = req.params.idProducto
        const cantProducto = req.params.cantProducto
        const idUser = req.idUser
        const carrito = await carritoService.addProduct(idUser,idProducto,parseInt(cantProducto))
        res.status(200).json(carrito)
    }
    catch(error){
        if(error instanceof CarritoException) res.status(error.status).json(error.message)
        else{
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
}

const deleteProduct = async (req,res) => {
    try{
        const idProducto = req.params.idProducto
        const idUser = req.idUser
        const carrito = await carritoService.deleteProduct(idUser,idProducto)
        res.status(200).json(carrito)
    }
    catch(error){
        if(error instanceof CarritoException) res.status(error.status).json(error.message)
        else{
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
}

const confirmarCompra = async (req,res) => {
    try{
        const idUser = req.idUser
        const carrito = await carritoService.confirmarCompra(idUser)
        res.status(200).json({message: "Compra realizada correctamente."})
    }
    catch(error){
        if(error instanceof CarritoException) res.status(error.status).json(error.message)
        else{
            res.status(500).json({"error":"Ocurrio un error"})
            logger.error(error)
        }
    }
}


module.exports = {getCarritoByUser,addProduct,deleteProduct,confirmarCompra};