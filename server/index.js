import express from "express";
import mongoose from "mongoose";
import ProductRouter from "./Routes/Product.js";
import UserRouter from "./Routes/User.js";
import dotenv from "dotenv";

dotenv.config();
const PORT = 8001;
const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/Find_In_Node", {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));

mongoose.connection.on("disconnected", ()=>console.log("MongoDB Disconnected"));

app.use("/api/product", ProductRouter);
app.use("/api/user", UserRouter);

app.listen(PORT, ()=>console.log(`Server running at PORT ${PORT}`));