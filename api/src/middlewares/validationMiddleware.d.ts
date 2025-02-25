import { Request, Response, NextFunction } from "express";

export function validateData(): (
	req: Request,
	res: Response,
	next: NextFunction
) => void;
