import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./Routes/ProductRoute.js";
import UserRoute from "./Routes/User.js";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_CONNECTION_URL, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>console.log("MongoDB Connected"))
.catch((error)=>console.log(error));

mongoose.connection.on("disconnected",()=>console.log("MongoDB Disconnected"));

app.get("/", (req,res)=>{
    res.send("Heyy This is the Backend PORT for MERN Ecommerce WebApplication");
  })

app.use("/api/products", ProductRoute);
app.use("/api/users", UserRoute);

app.listen(PORT, ()=>console.log(`Server Running at PORT ${PORT}`));