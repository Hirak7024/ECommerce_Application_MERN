import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true
    },
    Price: {
        type: Number,
        required: true
    },
    Description: {
        type: String,
        required: true
    },
    Photo: {
        type: String
    },
    Category: {
        type: String,
        required: true
    },
},
    { timeStamps: true }
)

const ProductModel = mongoose.model("product", ProductSchema);
export default ProductModel;