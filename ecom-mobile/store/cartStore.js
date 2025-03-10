import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCart = create(
	persist(
		(set) => ({
			items: [],

			// todo : if already in cart, increase quantity else add a new item

			addProduct: (product) =>
				set((state) => ({ items: [...state.items, { product }] })),

			resetCart: () => set({ items: [] }),
		}),
		{
			name: "auth-storage", // Storage key name
			storage: createJSONStorage(() => AsyncStorage), // Use AsyncStorage
		}
	)
);
