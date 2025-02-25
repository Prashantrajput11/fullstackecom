import { Router } from "express";
import {
	getProductById,
	listProducts,
	deleteProduct,
	updateProduct,
	createProduct,
} from "./productsController";
import { validateData } from "../../middlewares/validationMiddleware";

import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";

import {
	createProductSchema,
	updateProductSchema,
} from "../../db/productsSchema";

const router = Router();

// Product endpoints

// api listing
router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", validateData(createProductSchema), createProduct);
router.delete("/:id", deleteProduct);
router.put("/:id", validateData(updateProductSchema), updateProduct);

export default router;
