import {
	StyleSheet,
	Text,
	View,
	FlatList,
	Image,
	Pressable,
} from "react-native";
import React from "react";
import { useCart } from "../store/cartStore";
import tw from "twrnc"; // Import Tailwind
import { Redirect } from "expo-router";

const Cart = () => {
	const cartItems = useCart((state) => state.items);
	const resetCart = useCart((state) => state.resetCart);

	// Calculate total price
	// const totalPrice = validItems
	// 	.reduce((sum, item) => sum + item.product.price, 0)
	// 	.toFixed(2);

	function CartItem(item) {
		return (
			<View style={tw`flex-row items-center bg-gray-100 p-3 mb-3 rounded-lg`}>
				<Image
					source={{ uri: item.product.image }}
					style={tw`w-16 h-16 rounded-lg`}
				/>
				<View style={tw`ml-4 flex-1`}>
					<Text style={tw`text-lg font-semibold text-black`}>
						{item.product.name}
					</Text>
					<Text style={tw`text-gray-600`}>
						${item.product.price.toFixed(2)}
					</Text>
				</View>
			</View>
		);
	}

	const handleCheckout = () => {
		// reset cart

		resetCart();
	};

	if (cartItems?.length === 0) {
		return <Redirect href={"/"} />;
	}

	return (
		<View style={tw`flex-1 bg-white p-4`}>
			<Text style={tw`text-2xl font-bold text-black mb-4`}>Cart</Text>

			<FlatList
				data={cartItems}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => CartItem(item)}
				ListFooterComponent={() => (
					<Pressable
						style={tw`mt-4 p-3 bg-black rounded-lg`}
						onPress={handleCheckout}
					>
						<Text style={tw`text-white text-lg font-semibold text-center`}>
							Checkout
						</Text>
					</Pressable>
				)}
			/>

			{/* Total Price Section
			{validItems.length > 0 && (
				<View style={tw`mt-4 p-3 bg-black rounded-lg`}>
					<Text style={tw`text-white text-lg font-semibold text-center`}>
						Total: ${totalPrice}
					</Text>
				</View>
			)} */}
		</View>
	);
};

export default Cart;
