import {
	Text,
	View,
	TextInput,
	TouchableOpacity,
	Image,
	SafeAreaView,
	Alert,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router"; // useRouter for navigation
import tw from "twrnc";
import { useMutation } from "@tanstack/react-query";
import { register } from "../../services/auth";
import { useAuth } from "../../store/authStore"; // Import Zustand store

const Register = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const router = useRouter(); // Use router for navigation

	// Zustand state management
	const setUser = useAuth((state) => state.setUser);

	const signupMutation = useMutation({
		mutationFn: () => register(email, password),
		onSuccess: (data) => {
			setUser(data.user); // Store user info in Zustand
			console.log("Signup Successful:", data);

			// Redirect to login so user can log in
			Alert.alert("Success", "Account created! Please log in.", [
				{ text: "OK", onPress: () => router.push("/Login") },
			]);
		},
		onError: (error) => {
			console.error("Signup error:", error);
			Alert.alert(
				"Signup Failed",
				error.message || "An unexpected error occurred."
			);
		},
	});

	const handleRegister = () => {
		if (!email || !password) {
			Alert.alert("Required Fields", "Please enter both email and password");
			return;
		}
		signupMutation.mutate();
	};

	return (
		<SafeAreaView style={tw`flex-1 bg-white`}>
			<View style={tw`items-center mt-10`}>
				<Image
					source={{ uri: "https://via.placeholder.com/100" }}
					style={tw`w-[100px] h-[100px] rounded-lg`}
				/>
				<Text style={tw`text-2xl font-bold text-gray-800 mt-2`}>MyApp</Text>
			</View>

			<View style={tw`flex-1 px-6 pt-10`}>
				<Text style={tw`text-3xl font-bold text-gray-800`}>Welcome</Text>
				<Text style={tw`text-base text-gray-600 mt-1 mb-8`}>
					Sign up to continue
				</Text>

				<View style={tw`mb-5`}>
					<Text style={tw`text-sm font-medium text-gray-800 mb-2`}>Email</Text>
					<TextInput
						style={tw`bg-gray-100 rounded-lg px-4 py-3 text-base border border-gray-200`}
						placeholder="Enter your email"
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
						style={tw`bg-gray-100 rounded-lg px-4 py-3 text-base border border-gray-200`}
						placeholder="Enter your password"
						value={password}
						onChangeText={setPassword}
						secureTextEntry
					/>
				</View>

				<TouchableOpacity
					style={tw`bg-blue-600 rounded-lg py-4 items-center mb-5`}
					onPress={handleRegister}
					disabled={signupMutation.isLoading}
				>
					<Text style={tw`text-white text-base font-semibold`}>
						{signupMutation.isLoading ? "Signing up..." : "Register"}
					</Text>
				</TouchableOpacity>

				<View style={tw`flex-row items-center my-5`}>
					<View style={tw`flex-1 h-px bg-gray-200`} />
					<Text style={tw`text-gray-500 px-4 text-sm`}>OR</Text>
					<View style={tw`flex-1 h-px bg-gray-200`} />
				</View>

				<View style={tw`flex-row justify-center mt-4`}>
					<Text style={tw`text-gray-600 text-sm`}>
						Already have an account?{" "}
					</Text>
					<Link href="/Login" asChild>
						<TouchableOpacity>
							<Text style={tw`text-blue-600 text-sm font-semibold`}>Login</Text>
						</TouchableOpacity>
					</Link>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Register;
