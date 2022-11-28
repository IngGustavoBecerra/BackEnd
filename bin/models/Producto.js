const mongoose = require('mongoose');
const Schema = mongoose.Schema

const TiendaSchema = new Schema({
    nameProduct:{
        type: String,
        require: true,
        unique: true
    },
    cantidad:{
        type: Number,
        require: true
    },
    precio: {
        type: Number,
        require: true
    },
    imagen: String
},{
    timestamps:true,
})

var Producto = mongoose.model('Producto',TiendaSchema)
module.exports = Producto
