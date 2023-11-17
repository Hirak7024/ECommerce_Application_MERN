import express from "express";
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts, getBestSellingProducts,getWishlistedProducts,addProductsToWishlist } from "../Controllers/ProductController.js";
import authMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.get("/getProductById/:id", getProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/getProducts", getProducts);
router.get("/products/bestSelling", getBestSellingProducts);
router.post("/addProducts/toWishlist", authMiddleWare, addProductsToWishlist);
router.post("/getProducts/wishlisted", getWishlistedProducts);

export default router;