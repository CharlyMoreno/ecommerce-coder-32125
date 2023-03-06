const { Router } = require('express')
const categoriaRouter = Router()

const CategoriaController = require('../controllers/api.categorias.controllers')

categoriaRouter.get('/',CategoriaController.getAllCategorias)
categoriaRouter.post('/',CategoriaController.saveCategoria)
categoriaRouter.get('/:id',CategoriaController.getCategoriaByID)
categoriaRouter.put('/:id',CategoriaController.updateCategoria)
categoriaRouter.delete('/:id',CategoriaController.deleteCategoriaByID)


module.exports = categoriaRouter;