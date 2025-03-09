import { create } from "zustand";

export const useCart = create((set) => ({
	items: [],

	// todo : if already in cart, increase quantity else add a new item

	addProduct: (product) =>
		set((state) => ({ items: [...state.items, { product }] })),

	resetCart: () => set({ items: [] }),
}));
