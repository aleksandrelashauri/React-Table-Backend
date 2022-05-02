const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: { type: String, required: true },
    mpns: { type: String, required: true },
    category: { type: String, required: true },
    manufacturer: { type: String, required: true},
    available: { type: Number, required: true },
    type: { type: String, required: true },
    checked:{type:Boolean,default:false},
    owner:{
        type:String
    }
});

module.exports = mongoose.model('products', ProductSchema);