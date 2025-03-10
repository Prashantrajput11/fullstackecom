import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = create(
	persist(
		(set) => ({
			user: null,
			token: null,

			setUser: (user) => set({ user }),
			setToken: (token) => set({ token }),

			logout: () => set({ user: null, token: null }), // Clear on logout
		}),
		{
			name: "auth-storage", // Storage key name
			storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
		}
	)
);
