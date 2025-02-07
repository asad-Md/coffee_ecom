import { create } from "zustand";

const useCartStore = create((set) => ({
  user: {
    full_name: "",
    email: "",
    cart: [],
  },
  updateUser: (newUser: any) =>
    set((state: any) => ({ user: { ...state.user, ...newUser } })),

  fetchUser: async () => {
    const response = await fetch("https://api.example.com/user");
    const fetchedUser = await response.json();

    set({ user: response });
  },

  increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
  removeAllBears: () => set({ bears: 0 }),
}));
