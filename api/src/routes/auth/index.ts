import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware.js";
import {
	createUserSchema,
	loginSchema,
	usersTable,
} from "../../db/usersSchema.js";
import bcrypt from "bcryptjs";
import { db } from "../../db/index.js";
import { eq } from "drizzle-orm";
import jwt from "jsonwebtoken";

const router = Router();

// Not making seprate controller file bcz they are just 2 controllers
router.post("/register", validateData(createUserSchema), async (req, res) => {
	try {
		const { password, ...rest } = req.cleanBody;
		const [user] = await db
			.insert(usersTable)
			.values({
				...rest,
				password: await bcrypt.hash(password, 10),
			})
			.returning();

		// remove password
		const { password: pass, ...userWithoutPassword } = user;

		//send status and json
		res.status(201).json({ user: userWithoutPassword });
	} catch (error) {
		res.status(500).json({ error: "Failed to register user" });
	}
});

// Login
router.post("/login", validateData(loginSchema), async (req, res) => {
	try {
		const { email, password } = req.cleanBody;

		// Check if user exists
		const [user] = await db
			.select()
			.from(usersTable)
			.where(eq(usersTable.email, email));

		// If no user found with this email
		if (!user) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		// User exists, now compare passwords
		const matched = await bcrypt.compare(password, user.password);

		if (!matched) {
			res.status(401).json({ error: "Invalid credentials" });
			return;
		}

		// Create a JWT token
		const token = jwt.sign(
			{ userId: user.id, role: user.role },
			"your-secret",
			{ expiresIn: "30d" }
		);

		// Use object destructuring to create a new object without the password
		const { password: _, ...userWithoutPassword } = user;

		res.status(201).json({ token, user: userWithoutPassword });
	} catch (error) {
		res.status(500).json({});
	}
});

export default router;
