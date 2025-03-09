import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import { Link, Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ShoppingCart } from "lucide-react-native";
import { useRouter } from "expo-router";
import { useCart } from "../store/cartStore";

// Create a client
const queryClient = new QueryClient();

const RootLayout = () => {
	const router = useRouter(); // Navigation ke liye useRouter hook

	const cartLength = useCart((state) => state.items.length);

	return (
		<QueryClientProvider client={queryClient}>
			<Stack
				screenOptions={{
					headerRight: () => (
						<Link href={"/cart"} asChild>
							<TouchableOpacity
								onPress={() => router.push("/cart")}
								style={{
									flexDirection: "row",
									backgroundColor: "tomato",
									alignItems: "center",
									padding: 4,
									borderRadius: 12,
								}}
							>
								<ShoppingCart
									size={24}
									color="white"
									style={{ marginRight: 5 }}
								/>
								<Text style={{ color: "#fff", fontWeight: "bold" }}>
									{cartLength}
								</Text>
							</TouchableOpacity>
						</Link>
					),
				}}
			>
				<Stack.Screen name="index" options={{ title: "Shop" }} />
				<Stack.Screen name="product/[id]" options={{ title: "Product" }} />
			</Stack>
		</QueryClientProvider>
	);
};

export default RootLayout;

const styles = StyleSheet.create({});
