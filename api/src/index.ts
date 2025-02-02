import express, { json, urlencoded } from "express";

import productRouter from "./routes/products/index";
import dotenv from "dotenv";
const app = express();

// json middleware
app.use(json());

dotenv.config();

const port = process.env.PORT;
app.get("/", (req, res) => {
	res.send("Hello Prashant");
});

app.use("/products", productRouter);

// Listen Port
app.listen(port, () => {
	console.log(`example app listening on port  ${port}`);
});
