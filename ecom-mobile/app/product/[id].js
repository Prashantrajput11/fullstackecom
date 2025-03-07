import {
	View,
	Text,
	Image,
	StyleSheet,
	TouchableOpacity,
	ScrollView,
	SafeAreaView,
	StatusBar,
	ActivityIndicator,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import products from "../../assets/products.json";
import { fetchProductById } from "../../services/product";
import { useQuery } from "@tanstack/react-query";

const ProductDetailsScreen = () => {
	const { id } = useLocalSearchParams();
	const router = useRouter();

	console.log("id", id);

	const {
		data: product,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["products", id],
		queryFn: () => fetchProductById(Number(id)),
		staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
	});

	console.log("prod", product);

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
	// const product = products.find((prod) => prod.id === Number(id));

	// if (!product) {
	// 	return (
	// 		<SafeAreaView style={styles.errorContainer}>
	// 			<Text style={styles.errorText}>Product not found</Text>
	// 			<TouchableOpacity
	// 				style={styles.backButton}
	// 				onPress={() => router.back()}
	// 			>
	// 				<Text style={styles.backButtonText}>Go Back</Text>
	// 			</TouchableOpacity>
	// 		</SafeAreaView>
	// 	);
	// }

	return (
		<SafeAreaView style={styles.safeArea}>
			<StatusBar barStyle="dark-content" />

			{/* <View style={styles.header}>
				<TouchableOpacity style={styles.backIcon} onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={24} color="#333" />
				</TouchableOpacity>
				<View style={styles.headerRight}>
					<TouchableOpacity style={styles.iconButton}>
						<Ionicons name="heart-outline" size={24} color="#333" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.iconButton}>
						<Ionicons name="share-outline" size={24} color="#333" />
					</TouchableOpacity>
				</View>
			</View> */}

			<ScrollView style={styles.scrollView}>
				<View style={styles.imageContainer}>
					<Image source={{ uri: product.image }} style={styles.image} />
				</View>

				<View style={styles.infoContainer}>
					<View style={styles.nameRow}>
						<Text style={styles.name}>{product.name}</Text>
						<Text style={styles.price}>${product.price.toFixed(2)}</Text>
					</View>

					{product.rating && (
						<View style={styles.ratingContainer}>
							{[1, 2, 3, 4, 5].map((star) => (
								<Ionicons
									key={star}
									name={star <= product.rating ? "star" : "star-outline"}
									size={18}
									color="#FFD700"
								/>
							))}
							<Text style={styles.ratingText}>
								{product.rating.toFixed(1)} ({product.reviews || 0} reviews)
							</Text>
						</View>
					)}

					{/* {product.inStock ? (
						<View style={styles.stockContainer}>
							<View style={styles.stockDot} />
							<Text style={styles.inStockText}>In Stock</Text>
						</View>
					) : (
						<Text style={styles.outOfStockText}>Out of Stock</Text>
					)} */}

					<View style={styles.divider} />

					<Text style={styles.sectionTitle}>Description</Text>
					<Text style={styles.description}>{product.description}</Text>

					<View style={styles.divider} />

					{product.features && (
						<>
							<Text style={styles.sectionTitle}>Features</Text>
							<View style={styles.featuresContainer}>
								{product.features.map((feature, index) => (
									<View key={index} style={styles.featureItem}>
										<Ionicons
											name="checkmark-circle"
											size={18}
											color="#4CAF50"
										/>
										<Text style={styles.featureText}>{feature}</Text>
									</View>
								))}
							</View>
						</>
					)}
				</View>
			</ScrollView>

			<View style={styles.footer}>
				<TouchableOpacity
					style={styles.cartButton}
					onPress={() => console.log("Added to Cart")}
				>
					<Ionicons name="cart" size={20} color="#fff" />
					<Text style={styles.cartButtonText}>Add to Cart</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: "#f9f9f9",
	},
	scrollView: {
		flex: 1,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: "#fff",
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	backIcon: {
		padding: 8,
	},
	headerRight: {
		flexDirection: "row",
	},
	iconButton: {
		padding: 8,
		marginLeft: 8,
	},
	imageContainer: {
		backgroundColor: "#fff",
		alignItems: "center",
		padding: 20,
		marginBottom: 16,
		borderBottomWidth: 1,
		borderBottomColor: "#f0f0f0",
	},
	image: {
		width: 280,
		height: 280,
		resizeMode: "contain",
	},
	infoContainer: {
		backgroundColor: "#fff",
		borderRadius: 12,
		marginHorizontal: 16,
		marginBottom: 80,
		padding: 16,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.05,
		shadowRadius: 3.84,
		elevation: 3,
	},
	nameRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 8,
	},
	name: {
		fontSize: 22,
		fontWeight: "bold",
		color: "#333",
		flex: 1,
		marginRight: 8,
	},
	price: {
		fontSize: 22,
		color: "#2E7D32",
		fontWeight: "bold",
	},
	ratingContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginVertical: 8,
	},
	ratingText: {
		marginLeft: 6,
		fontSize: 14,
		color: "#666",
	},
	stockContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginTop: 6,
	},
	stockDot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#4CAF50",
		marginRight: 6,
	},
	inStockText: {
		fontSize: 14,
		color: "#4CAF50",
	},
	outOfStockText: {
		fontSize: 14,
		color: "#F44336",
		marginTop: 6,
	},
	divider: {
		height: 1,
		backgroundColor: "#f0f0f0",
		marginVertical: 16,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "600",
		color: "#333",
		marginBottom: 10,
	},
	description: {
		fontSize: 16,
		lineHeight: 24,
		color: "#555",
	},
	featuresContainer: {
		marginTop: 8,
	},
	featureItem: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 8,
	},
	featureText: {
		fontSize: 15,
		color: "#555",
		marginLeft: 8,
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#fff",
		paddingHorizontal: 16,
		paddingVertical: 12,
		borderTopWidth: 1,
		borderTopColor: "#f0f0f0",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: -2 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 5,
	},
	cartButton: {
		backgroundColor: "#1565C0",
		paddingVertical: 14,
		borderRadius: 10,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	cartButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
		marginLeft: 8,
	},
	errorContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 20,
		backgroundColor: "#f9f9f9",
	},
	errorText: {
		fontSize: 18,
		color: "#F44336",
		marginBottom: 20,
	},
	backButton: {
		backgroundColor: "#1565C0",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 8,
	},
	backButtonText: {
		color: "#fff",
		fontSize: 16,
		fontWeight: "600",
	},
});
