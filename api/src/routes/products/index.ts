import { Router } from "express";
import {
	getProductById,
	listProducts,
	deleteProduct,
	updateProduct,
	createProduct,
} from "./productsController.js";
import { validateData } from "../../middlewares/validationMiddleware.js";

import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import {
	createProductSchema,
	updateProductSchema,
} from "../../db/productsSchema.js";
import { verifySeller, verifyToken } from "../../middlewares/verifyToken.js";

const router = Router();
// Consolas, 'Courier New', monospace
// FiraCode;
// Product endpoints

// api listing
router.get("/", listProducts);
router.get("/:id", getProductById);
router.post(
	"/",
	verifyToken,
	verifySeller,
	validateData(createProductSchema),
	createProduct
);
router.delete("/:id", verifyToken, verifySeller, deleteProduct);
router.put(
	"/:id",
	verifyToken,
	verifySeller,
	validateData(updateProductSchema),
	updateProduct
);

export default router;
