import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack, Tabs } from "expo-router";
import {
	useQuery,
	useMutation,
	useQueryClient,
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";

// Create a client
const queryClient = new QueryClient();
const RootLayout = () => {
	return (
		<QueryClientProvider client={queryClient}>
			<Stack>
				<Stack.Screen name="index" options={{ title: "Shop" }} />
				<Stack.Screen name="product/[id]" options={{ title: "Product" }} />
			</Stack>
		</QueryClientProvider>
	);
};

export default RootLayout;

const styles = StyleSheet.create({});
