import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons"; // For icons
import { Link } from "expo-router";

const ProductListItem = ({ product }) => {
	return (
		<Link href={`/product/${product.id}`} asChild>
			<TouchableOpacity style={styles.productCard}>
				<Image source={{ uri: product.image }} style={styles.image} />

				<Text style={styles.name}>{product.name}</Text>

				<Text style={styles.price}>${product.price.toFixed(2)}</Text>

				<View style={styles.buttonContainer}>
					<View>
						<TouchableOpacity
							onPress={() => console.log("hello")}
							style={styles.cartButton}
						>
							<Text style={styles.cartButtonText}>Add to Cart</Text>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => console.log("hello")}
							style={styles.wishButton}
						>
							<Text style={styles.wishButtonText}>Add to Wishlist</Text>
						</TouchableOpacity>
					</View>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default ProductListItem;

const styles = StyleSheet.create({
	productCard: {
		flex: 1,
		backgroundColor: "#f9f9f9",
		margin: 8,
		borderRadius: 10,
		alignItems: "center",
		padding: 10,
		elevation: 3, // Shadow for Android
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	image: {
		width: 100,
		height: 100,
		resizeMode: "contain",
	},
	name: {
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 5,
	},
	price: {
		fontSize: 14,
		color: "green",
		marginTop: 3,
		fontWeight: "bold",
	},
	buttonContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 10,
	},
	iconButton: {
		padding: 8,
	},
	cartButton: {
		backgroundColor: "#007bff",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		marginLeft: 10,
		marginBottom: 20,
	},
	wishButton: {
		backgroundColor: "#fff",
		paddingVertical: 6,
		paddingHorizontal: 12,
		borderRadius: 6,
		marginLeft: 10,
		marginBottom: 20,
		borderWidth: 1,
		borderColor: "#000",
	},
	cartButtonText: {
		color: "#fff",
		fontWeight: "bold",
		fontSize: 12,
	},
	wishButtonText: {
		color: "#000",
		fontWeight: "semibold",
		fontSize: 12,
	},
});
