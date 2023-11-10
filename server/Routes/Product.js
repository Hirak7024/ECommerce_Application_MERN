import express from "express";
import { createProduct, updateProduct, deleteProduct, getProduct, getProductByCategory, filterProduct } from "../Controllers/Product.js";

const router = express.Router();

router.post("/create", createProduct);
router.put("/update/:id", updateProduct);
router.get("/:id", getProduct);
router.delete("/delete/:id", deleteProduct);
router.post("/getProductByCategory", getProductByCategory);
router.post("/filterProduct", filterProduct);

export default router;