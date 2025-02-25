import { Request, Response } from "express";
import { db } from "../../db/index";
import { createProductSchema, productsTable } from "../../db/productsSchema";
import { eq } from "drizzle-orm";
import _ from "lodash";

export async function listProducts(req: Request, res: Response) {
	try {
		const products = await db.select().from(productsTable);
		res.status(200).json(products);
	} catch (error) {
		res.status(500).send(error);
	}
}

export async function getProductById(req: Request, res: Response) {
	try {
		const { id } = req.params;
		const [product] = await db
			.select()
			.from(productsTable)
			.where(eq(productsTable.id, Number(id)));

		if (!product) {
			res.status(404).send({ message: "product not found" });
		} else {
			res.json(product);
		}
	} catch (error) {
		res.status(500).send(error);
	}
}

export async function createProduct(req: Request, res: Response) {
	try {
		const [product] = await db
			.insert(productsTable)
			.values(req.cleanBody)
			.returning();

		res.status(201).json(product);
	} catch (error) {
		res.status(500).send(error);
	}
}

export async function updateProduct(req: Request, res: Response) {
	try {
		// get id

		const { id } = req.params;
		const updatedFields = req.cleanBody;

		const [updatedProduct] = await db
			.update(productsTable)
			.set(updatedFields)
			.where(eq(productsTable.id, Number(id)))
			.returning();

		// If product not found
		if (updatedProduct) {
			res.json(updatedProduct);
		} else {
			res.status(404).send({ message: "Product not found" });
		}
	} catch (error) {
		res.status(500).send(error);
	}
}

export async function deleteProduct(req: Request, res: Response) {
	const { id } = req.params;

	const [deletedProduct] = await db
		.delete(productsTable)
		.where(eq(productsTable.id, Number(id)))
		.returning();

	if (deletedProduct) {
		res.status(204).send();
	} else {
		res.status(404).send({ message: "product was not found" });
	}

	try {
	} catch (error) {
		res.status(500).send(error);
	}
}
