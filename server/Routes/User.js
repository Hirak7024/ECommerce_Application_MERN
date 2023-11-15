import express from "express";
import {
    RegisterUser,
    LoginUser,
    addProductsToWishlist,
    getWishlistedProducts,
    getPayloadFromToken,
    addProductsToCart,
    removeProductsFromCart,
    getCartProducts
} from "../Controllers/User.js";
import authMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.post("/addProducts/toWishlist", authMiddleWare, addProductsToWishlist);
router.post("/getProducts/wishlisted", getWishlistedProducts);
router.get("/getDecode/TokenPayload",getPayloadFromToken);
// router.post("/add/product/toCart", addProductsToCart);
// router.post("/remove/product/fromCart", removeProductsFromCart);
// router.post("/getProducts/fromCart", getCartProducts);

export default router;