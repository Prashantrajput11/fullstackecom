import {
	StyleSheet,
	Text,
	View,
	FlatList,
	ActivityIndicator,
} from "react-native";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { listProducts } from "../services/product";
import ProductListItem from "../components/ProductListItem";

const HomeScreen = () => {
	const {
		data: products = [],
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products"],
		queryFn: listProducts,
		staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
	});

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color="#000" />
			</View>
		);
	}

	if (error) {
		return (
			<View style={styles.errorContainer}>
				<Text style={styles.errorText}>Error fetching products</Text>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<FlatList
				data={products}
				numColumns={2}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <ProductListItem product={item} />}
				contentContainerStyle={styles.flatListContainer}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// backgroundColor: "#FFEB3B", // Bright yellow background
		paddingTop: 10,
	},
	flatListContainer: {
		paddingHorizontal: 10,
		paddingBottom: 20,
	},
	loadingContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	errorText: {
		color: "#D32F2F",
		fontSize: 16,
		fontWeight: "bold",
	},
	productCard: {
		flex: 1,
		backgroundColor: "#F44336", // Bright red cards
		margin: 8,
		borderRadius: 10,
		borderWidth: 4,
		borderColor: "#000", // Thick black border
		alignItems: "center",
		padding: 10,
		elevation: 10, // Strong shadow
		shadowColor: "#000",
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 1,
		shadowRadius: 0,
	},
	productImage: {
		width: 100,
		height: 100,
		resizeMode: "contain",
	},
	productName: {
		fontSize: 14,
		fontWeight: "bold",
		textAlign: "center",
		marginTop: 5,
		color: "#fff",
	},
	productPrice: {
		fontSize: 12,
		color: "#000",
		marginTop: 3,
		fontWeight: "bold",
		textTransform: "uppercase",
	},
});
