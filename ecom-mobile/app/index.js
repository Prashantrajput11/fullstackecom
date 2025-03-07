import { StyleSheet, Text, View, FlatList, Image } from "react-native";
import React from "react";
import products from "../assets/products.json";
import ProductListItem from "../components/ProductListItem";

const HomeScreen = () => {
	return (
		<View style={styles.container}>
			<FlatList
				data={products}
				numColumns={2} // 2-column grid
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item }) => <ProductListItem product={item} />}
				contentContainerStyle={{ paddingHorizontal: 10, paddingBottom: 20 }}
			/>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		paddingTop: 10,
	},
	productCard: {
		flex: 1,
		backgroundColor: "#f9f9f9",
		margin: 8,
		borderRadius: 10,
		alignItems: "center",
		padding: 10,
		elevation: 3, // Shadow effect
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
		fontSize: 12,
		color: "green",
		marginTop: 3,
	},
});
