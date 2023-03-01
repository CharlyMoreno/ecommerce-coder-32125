const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
  timestamp: {
    type: Date,
    default: Date.now,
  },
  productos: [{
    producto:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "productos",
    },
    cantidad:{type: Number,default:1}
  }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

const CarritosModel = mongoose.model("carritos", Schema);
module.exports = CarritosModel;
