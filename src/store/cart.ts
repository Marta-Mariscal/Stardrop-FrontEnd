import { create } from "zustand";
import { persist } from "zustand/middleware";
import { type Error } from "@/types/error";
import { type DataError } from "@/types/dataError";
import { type Order } from "@/types/order";
import { type GarmentItem } from "@/types/garment-item";
import { makeOrder } from "@/services/order";
import { CustomException } from "@/exceptions/customException";

interface CartStore {
    cart: Array<GarmentItem>;
    loading?: boolean;
    error?: Error;
    addToCart: (item: GarmentItem) => DataError;
    removeOneItemFromCart: (item: GarmentItem) => DataError;
    removeAllItemsFromCart: (item: GarmentItem) => DataError;
    clearCart: () => void;
    getTotalPrice: () => number;
    makeOrder: (callback?: { onSuccess?: (response: Order) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
}

export const useCart = create<CartStore>()(
    persist(
        (set, get) => ({
            cart: [],
            loading: false,
            error: null,
            addToCart: (item) => {
                set({ error: null });
                const state = get();
                const existingItemIndex = state.cart.findIndex((cartItem) => cartItem.base?._id === item.base?._id && cartItem.size === item.size);

                if (existingItemIndex === -1) {
                    set({ cart: [...state.cart, item] });
                    return { data: { cart: get().cart }, error: null };
                }

                if (item.base?.type === "second-hand") {
                    set({ error: { message: "You cannot add more than one second-hand garment to the cart." } });
                    return { data: null, error: { message: "You cannot add more than one second-hand garment to the cart." } };
                }

                const updatedCart = [...state.cart];
                updatedCart[existingItemIndex].quantity++;
                set({ cart: updatedCart });
                return { data: { cart: get().cart }, error: null };
            },
            removeOneItemFromCart: (item) => {
                set({ error: null });
                const state = get();
                if (state.cart.length === 0) {
                    set({ error: { message: "Cart is empty." } });
                    return { data: null, error: { message: "Cart is empty." } };
                }

                const existingItemIndex = state.cart.findIndex((cartItem) => cartItem.base?._id === item.base?._id && cartItem.size === item.size);

                if (existingItemIndex === -1) {
                    set({ error: { message: "Item not found in cart." } });
                    return { data: null, error: { message: "Item not found in cart." } };
                }

                const updatedCart = [...state.cart];
                updatedCart[existingItemIndex].quantity--;

                if (updatedCart[existingItemIndex].quantity <= 0) {
                    updatedCart.splice(existingItemIndex, 1);
                }

                set({ cart: updatedCart });
                return { data: { cart: get().cart }, error: null };
            },
            removeAllItemsFromCart: (item) => {
                set({ error: null });
                const state = get();
                if (state.cart.length === 0) {
                    set({ error: { message: "Cart is empty." } });
                    return { data: null, error: { message: "Cart is empty." } };
                }

                const existingItemIndex = state.cart.findIndex((cartItem) => cartItem.base?._id === item.base?._id && cartItem.size === item.size);

                if (existingItemIndex === -1) {
                    set({ error: { message: "Item not found in cart." } });
                    return { data: null, error: { message: "Item not found in cart." } };
                }

                const updatedCart = [...state.cart];
                updatedCart.splice(existingItemIndex, 1);

                set({ cart: updatedCart });
                return { data: { cart: get().cart }, error: null };
            },
            clearCart: () => {
                set({ cart: [] });
            },
            getTotalPrice: () => {
                const state = get();
                return state.cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
            },
            makeOrder: (callback) => {
                set({ error: null });
                set({ loading: true });
                makeOrder(get().cart)
                    .then((response) => {
                        set({ cart: [] });
                        if (callback?.onSuccess) callback.onSuccess(response);
                    })
                    .catch((error) => {
                        if (error instanceof CustomException) set({ error: error.detail });
                        else set({ error: { message: error.message } });
                        if (callback?.onError) callback.onError(get().error);
                    })
                    .finally(() => {
                        set({ loading: false });
                        if (callback?.onFinally) callback.onFinally();
                    });
            }
        }),
        {
            name: "cart"
        }
    )
);
