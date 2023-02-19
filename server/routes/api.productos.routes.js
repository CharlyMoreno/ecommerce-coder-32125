const { Router } = require('express')
const productosRouter = Router()

const {getAllProducts,saveProduct,getProductById,updateProduct,deleteProductById} = require('../controllers/api.productos.controllers')

productosRouter.get('/',getAllProducts)

productosRouter.post('/',saveProduct)

productosRouter.get('/:id',getProductById)

productosRouter.put('/:id',updateProduct)

productosRouter.delete('/:id',deleteProductById)

module.exports = productosRouter;