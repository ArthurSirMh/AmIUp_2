import dotenv from "dotenv";
dotenv.config();
import routes from "./routes";
import express from "express";
import { connectDB } from "./config/db";
connectDB()
const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT
app.use("/api", routes);
app.get("/", (req, res) => {
    res.send('hello ARTHUR')
})

app.listen(port, () => console.log(`Server Listening in  PORT ${port}`))
