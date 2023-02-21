const { body } = require('express-validator');

const registerValidation = [
    body('nombre')
    .exists()
    .withMessage('El nombre es un campo requerido')
    .trim(),
    body('username')
    .exists()
    .withMessage('El username es un campo requerido'),
    body('email')
    .exists()
    .withMessage('El email es un campo requerido')
    .isEmail()
    .withMessage('Debe ingresar un email valido'),
    body('password')
    .exists()
    .withMessage('El password es un campo requerido')
    .isLength({ min: 5 })
    .withMessage('El password debe tener +5 caracteres'),
    body('numeroTel')
    .exists()
    .withMessage('El numero de celular es un campo requerido')
    .isInt()
    .withMessage('El numero de telefono no es valido')
]

module.exports = {registerValidation}