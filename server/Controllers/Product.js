import ProductModel from "../Models/Product.js";

const createProduct = async (req, res) => {
    try {
        const newProduct = new ProductModel(req.body);
        const savedProduct = await newProduct.save();
        res.json(savedProduct);
    } catch (error) {
        res.json(error);
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        await product.updateOne({ $set: req.body });
        res.status(200).json("Product Updated");
    } catch (error) {
        res.status(500).json(error);
    }
};

const getProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        res.status(200).json(product);
    }
    catch (error) {
        res.status(500).json(error);
    }
}

const deleteProduct = async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await ProductModel.findById(productId);
        await product.deleteOne();
        res.status(200).json("Product Deleted");
    }
    catch (error) {
        res.status(500).json(error);
    }
}

const getProductByCategory = async (req, res) => {
    try {
        const { Category } = req.body;

        if (!Category) {
            return res.status(400).json({ message: "Category is required in the request body." });
        }

        const products = await ProductModel.find({ Category: Category });

        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found for this category." });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const filterProduct = async (req, res) => {
    const { category, color, brand } = req.body;
    try {
        const product = await ProductModel.find({
            Category: category,
            Color: color,
            Brand: brand
        });
        if (!product) {
            res.status(400).json({ message: "No such product exits" });
        }
        else {
            res.status(200).json(product);
        }
    } catch (error) {
        res.json(error);
    }
}



export { createProduct, updateProduct, deleteProduct, getProduct, getProductByCategory, filterProduct };


