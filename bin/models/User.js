const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        require: true,
        unique: true
    },
    password: String,
    email: String,
    roll:{
        type: String,
        default: "consumer",
    }, 
    active: {
        type: Boolean,
        default:true
    }
},{
    timestamps:true,
})

var User = mongoose.model('User',UserSchema)
module.exports = User

