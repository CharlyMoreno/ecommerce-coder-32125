const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  productos: [{
    producto:{
        nombre: {
            type: String,
            required: true,
            max: 100
        },
        precio: {
            type: Number,
            required: true
        },
        foto: {
            type: String,
            max: 200
        },
    },
    cantidad:{type: Number,default:1}
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const OrdenModel = mongoose.model("ordenes", Schema);
module.exports = OrdenModel;
