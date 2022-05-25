const mongoose = require("mongoose");
const uuid = require("uuid");

const orderSchema = new mongoose.Schema({
    _id : {type: String, default: uuid.v1},
    name: {type: String, required: true},
    duration: {type: Number, required: true},
});

module.exports = mongoose.model("Order", orderSchema);