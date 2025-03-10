import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	SafeAreaView,
	Alert,
} from "react-native";
import React, { useState } from "react";
import tw from "twrnc";
import { Link, Redirect } from "expo-router";
import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/auth";
import { useAuth } from "../../store/authStore"; // Import Zustand store

const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Zustand state management
	const setUser = useAuth((state) => state.setUser);
	const setToken = useAuth((state) => state.setToken);
	const isLoggedIn = useAuth((s) => !!s.token);

	const loginMutation = useMutation({
		mutationFn: () => login(email, password),
		onSuccess: (data) => {
			const { token, user } = data; // Assuming backend returns user details
			setToken(token); // Store token in Zustand
			setUser(user); // Store user in Zustand
			console.log("Login Successful:", data);

			// Redirect to home or protected screen
			// router.push("/home");
		},
		onError: (error) => {
			console.log("error-->", error);
		},
	});

	if (isLoggedIn) {
		return <Redirect href={"/"} />;
	}

	// const ()=>loginMutation.mutate({ email, password }) = () => {
	// 	if (!email || !password) {
	// 		Alert.alert("Required Fields", "Please enter both email and password");
	// 		return;
	// 	}

	// 	loginMutation.mutate({ email, password });
	// };

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<View style={tw`mt-10 justify-center`}>
				<View style={tw`mb-20`}>
					<Text style={tw`text-center text-2xl font-semibold mb-2`}>Login</Text>
					<Text style={tw`text-center`}>You must login to continue</Text>
				</View>
			</View>

			<View style={tw`flex-1 px-4`}>
				<View style={tw`mb-5`}>
					<Text style={tw`text-sm font-medium text-gray-800 mb-2`}>Email</Text>
					<TextInput
						placeholder="Enter email"
						style={tw`bg-gray-200 py-4 px-3 rounded-lg`}
						value={email}
						onChangeText={setEmail}
						keyboardType="email-address"
						autoCapitalize="none"
					/>
				</View>

				<View style={tw`mb-5`}>
					<Text style={tw`text-sm font-medium text-gray-800 mb-2`}>
						Password
					</Text>
					<TextInput
						placeholder="Enter password"
						style={tw`bg-gray-200 py-4 px-3 rounded-lg`}
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
				</View>

				<TouchableOpacity
					style={tw`bg-black p-4 rounded-md mx-0 mt-6`}
					onPress={() => loginMutation.mutate()}
				>
					<Text style={tw`text-white text-center font-semibold text-base`}>
						Login
					</Text>
				</TouchableOpacity>

				<View style={tw`flex-row items-center py-2 justify-center mt-4`}>
					<Text style={tw`text-center text-base`}>
						Don't have an account yet?
					</Text>
					<Link href="/Register" asChild>
						<TouchableOpacity>
							<Text style={tw`ml-2 font-semibold`}>Register</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Login;
