const { validationResult } = require('express-validator');

const ValidationError = require('../utils/exceptions/validation.exceptions')

const checkValidation = (req) => {
    const data = validationResult(req);
    if (!data.isEmpty()) {
        throw new ValidationError('Propiedades faltantes o no válidas', {data: data.errors});
    }
}

module.exports = {checkValidation}