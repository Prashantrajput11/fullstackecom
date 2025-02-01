import { Router } from "express";

const router = Router();

// Product endpoints

// Get all products
router.get("/", (req, res) => {
	res.send("List of products");
});

// Get product by Id
router.get("/:id", (req, res) => {
	console.log(req.params);

	res.send("get product by id");
});

// Create a new product
router.post("/", (req, res) => {
	res.send("new product created");
});

export default router;
