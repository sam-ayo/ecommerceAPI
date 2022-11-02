const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{type:String, required:true},
    description:{type:Number, required:true},
    categories:{type: Array},
    image:{type:String,required:true},
    size:{type:String},
    color:{type:String},
    price:{type:Number,required:true}
},{timestamps:true});

exports.Product = new mongoose.model("Product",productSchema);