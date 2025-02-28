import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function verifyToken(req: Request, res: Response, next: NextFunction) {
	console.log(req.header);

	const token = req.header("Authorization");
	console.log("token", token);

	if (!token) {
		res.status(401).json({ error: "access deniedd" });

		return;
	}

	try {
		// here we will decode token

		const decoded = jwt.verify(token, "your-secret");

		if (typeof decoded !== "object" || !decoded?.userId) {
			res.status(401).json({ error: "access deniedddd" });
			return;
		}

		req.userId = decoded.userId;
		req.role = decoded.role;
		console.log("decoded", decoded);
		next();
	} catch (error) {
		res.status(401).json({ error: "access deniedddd" });
	}
}
export function verifySeller(req: Request, res: Response, next: NextFunction) {
	console.log(req.header);

	const role = req.role;

	if (role !== "seller") {
		res.status(401).json({ error: "access denied" });
		return;
	}

	next();
}
