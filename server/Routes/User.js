import express from "express";
import { RegisterUser, LoginUser, getPayloadFromToken, } from "../Controllers/User.js";
import authMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.post("/register", RegisterUser);
router.post("/login", LoginUser);
router.get("/getDecode/TokenPayload", getPayloadFromToken);


export default router;