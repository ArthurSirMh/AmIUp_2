import dotenv from "dotenv";
dotenv.config();

import express from "express";

import { connectDB } from "./config/db";
connectDB()
const app = express()

const port = 3000

app.get("/",(req,res)=>{
    res.send('hello ARTHUR')
})

app.listen(port,()=>console.log(`Server Listening in  PORT ${port}`))
