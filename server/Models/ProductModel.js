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
    Category: {
        type: String,
        required: true
    },
    Image: {
        type: String,
        required: true
    },
    Brand: {
        type: String,
        required: true
    },
    BestSelling: {
        type: Boolean,
        required: true
    },
},
    { timeStamps: true }
)

const ProductModel = mongoose.model("product", ProductSchema);
export default ProductModel;