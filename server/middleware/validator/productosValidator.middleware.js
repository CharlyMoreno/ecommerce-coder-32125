const { body } = require('express-validator');

const createProduct = [
    body('nombre')
    .exists()
    .withMessage('El nombre es un campo requerido')
    .trim(),
    body('foto')
    .trim()
    .exists()
    .withMessage('La Foto es un campo requerido')
    .isURL()
    .withMessage('Debe introducir una URL valida'),
    body('precio')
    .exists()
    .withMessage('El precio es un campo requerido')
    .isDecimal()
    .withMessage('Debe ingresar un precio valido')
]

module.exports = {createProduct}