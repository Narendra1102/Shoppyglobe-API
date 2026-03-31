import mongoose from 'mongoose'

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Product name is required"]
    },

    price:
    {
        type:Number,
        required: [true, "Product price is required"]
    },
    description:String,
    stock:{
        type:Number,
        required:true,
        default:0
    }
})


const productModel=mongoose.model("Product",productSchema)
export default productModel;
