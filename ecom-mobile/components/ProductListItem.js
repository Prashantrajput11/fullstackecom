import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Link } from "expo-router";

const ProductListItem = ({ product }) => {
	return (
		<Link href={`/product/${product.id}`} asChild>
			<TouchableOpacity style={styles.productCard}>
				<Image source={{ uri: product.image }} style={styles.image} />

				<View style={styles.infoContainer}>
					<Text style={styles.name} numberOfLines={1}>
						{product.name}
					</Text>
					<Text style={styles.price}>${product.price.toFixed(2)}</Text>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default ProductListItem;

const styles = StyleSheet.create({
	productCard: {
		flex: 1,
		backgroundColor: "#fff",
		margin: 10,
		borderRadius: 12,
		padding: 12,
		elevation: 4, // Shadow for Android
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#f0f0f0",
	},

	image: {
		width: 120,
		height: 120,
		resizeMode: "contain",
		borderRadius: 8,
	},

	infoContainer: {
		marginTop: 10,
		alignItems: "center",
	},

	name: {
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "center",
		color: "#333",
	},

	price: {
		fontSize: 14,
		color: "#2E7D32",
		marginTop: 4,
		fontWeight: "600",
	},
});
