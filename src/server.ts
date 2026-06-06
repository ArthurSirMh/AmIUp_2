import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";
import express from "express";
import { connectDB } from "./config/db";
connectDB()
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", routes);

app.listen(process.env.PORT, () => console.log(`Server Listening in  PORT ${process.env.PORT}`))
