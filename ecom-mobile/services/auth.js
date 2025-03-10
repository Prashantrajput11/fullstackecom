const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function register(email, password) {
	try {
		console.log(email);
		console.log(password);

		const response = await fetch(`${API_URL}/auth/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		if (!response.ok) {
			throw new Error(`failed to register`);
		}
		const user = await response.json();

		console.log(user);

		return user;
	} catch (error) {
		console.error("Failed to register user:", error);
		return { success: false, error: error.message };
	}
}
export async function login(email, password) {
	try {
		const response = await fetch(`${API_URL}/auth/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ email, password }),
		});

		const user = await response.json();
		if (!response.ok) {
			throw new Error(`failed to login`);
		}

		console.log("user-->", user);

		return user;
	} catch (error) {
		console.log("Failed to fetch user:", error);
		return { success: false, error: error.message };
	}
}
