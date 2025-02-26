import { Router } from "express";
import { validateData } from "../../middlewares/validationMiddleware";
import {
	createUserSchema,
	loginSchema,
	usersTable,
} from "../../db/usersSchema";
import bcrypt from "bcryptjs";
import { db } from "../../db/index";
import { eq } from "drizzle-orm";

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

		const { password: pass, ...userWithoutPassword } = user;

		//send status and json
		res.status(201).json({ user: userWithoutPassword });
	} catch (error) {
		res.status(500).json({ error: "Failed to register user" });
	}
});

// Login
// router.post("/login", validateData(loginSchema), async (req, res) => {
// 	try {
// 		const { email, password } = req.cleanBody;

// 		// check if user exist or not, if not show error message

// 		// Check if user exists
// 		const [user] = await db
// 			.select()
// 			.from(usersTable)
// 			.where(eq(usersTable.email, email))
// 			.limit(1);

// 		// If no user found with this email
// 		if (!user) {
// 			res.status(401).json({ error: "Invalid credentials" });

// 			return;
// 		}

// 		const hashedPassword = await bcrypt.hash(password, 10);

// 		// User exists, now compare passwords
// 		const match = await bcrypt.compare(user.password, hashedPassword);

// 		if (!match) {
// 			res.status(401).json({ error: "Invalid credentials" });
// 			return;
// 		} else {
// 			//create a jwt token
// 		}

// 		// res.send(200);
// 	} catch (error) {
// 		res.status(500).json({});
// 	}
// });

export default router;
