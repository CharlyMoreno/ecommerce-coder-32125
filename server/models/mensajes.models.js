const mongoose = require('mongoose')
const Schema = new mongoose.Schema({
    timestamp: {
        type: Date,
        default: Date.now,
      },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    texto: {
        type: String,
        required: true,
        max: 200
    },
    tipo:{
        type:String,
        default: 'usuario'
    }
})

const MensajesModel = mongoose.model("mensajes", Schema)

module.exports = MensajesModel;