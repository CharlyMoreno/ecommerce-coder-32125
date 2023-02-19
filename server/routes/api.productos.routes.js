const { Router } = require('express')
const productosRouter = Router()

const {getAllProducts,saveProduct,getProductById,updateProduct,deleteProductById} = require('../controllers/api.productos.controllers')

//___________________________________________  VALIDATIONS  _________________________________________________ //
const {createProduct} = require('../middleware/validator/productosValidator.middleware')

productosRouter.get('/',getAllProducts)

productosRouter.post('/',createProduct,saveProduct)

productosRouter.get('/:id',getProductById)

productosRouter.put('/:id',updateProduct)

productosRouter.delete('/:id',deleteProductById)

module.exports = productosRouter;