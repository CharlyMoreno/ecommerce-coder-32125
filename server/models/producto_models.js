const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        max: 100
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    precio: {
        type: Number,
        required: true
    },
    descripcion: {
        type: String,
        required: true,
        max: 500
    },
    codigo: {
        type: String,
        required: true,
        max: 6
    },
    foto: {
        type: String,
        max: 200
    },
    stock: {
        type: Number,
        required: true,
        max: 5000
    },
    categorias: [
        {
            type: Object,
            ref: "categoria",
        }
    ]
})

const ProductosModel = mongoose.model("productos", Schema)

module.exports = ProductosModel;