const API_URL = process.env.EXPO_PUBLIC_API_URL;

export async function listProducts() {
	try {
		const response = await fetch(`${API_URL}/products`);

		if (!response.ok) {
			throw new Error(`Error: ${response.status} - ${response.statusText}`);
		}
		const products = await response.json();
		return products;
	} catch (error) {
		console.error("Failed to fetch products:", error);
		return [];
	}
}

export async function fetchProductById(id) {
	try {
		const response = await fetch(`${API_URL}/products/${id}`);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(`Error: ${response.status} - ${response.statusText}`);
		}

		return data;
	} catch (error) {
		console.error("Failed to fetch products:", error);
		return [];
	}
}
