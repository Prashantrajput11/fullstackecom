import { Router } from "express";
import {
	getProductById,
	listProducts,
	deleteProduct,
	updateProduct,
	createProduct,
} from "./productsController";

const router = Router();

// Product endpoints

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", updateProduct);

export default router;
