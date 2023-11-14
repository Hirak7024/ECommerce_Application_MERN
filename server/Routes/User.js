import express from "express";
import { RegisterUser, LoginUser, addProductsToWishlist } from "../Controllers/User.js";
import authMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/addProducts/toWishlist", authMiddleWare, addProductsToWishlist);

export default router;