import express from "express";
import { createProduct, updateProduct, deleteProduct, getProduct, getProducts } from "../Controllers/ProductController.js";

const router = express.Router();

router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.get("/getProductById/:id", getProduct);
router.delete("/delete/:id", deleteProduct);
router.get("/getProducts", getProducts);

export default router;