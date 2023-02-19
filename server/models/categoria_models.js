const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        max: 200
    }
})

const CategoriaModel = mongoose.model("categoria", Schema)

module.exports = CategoriaModel;