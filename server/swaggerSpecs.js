const swaggerJsdoc = require('swagger-jsdoc')

const options = {
    definition:{
        openapi: "3.0.0",
        info: {
            title: "API Ecommerce TechStore",
            description: " Documentacion de APIRest con Swagger"
        }
    },
    apis:['././docs/**/*.yaml']
}

const swaggerSpecs = swaggerJsdoc(options)

module.exports = { swaggerSpecs }
