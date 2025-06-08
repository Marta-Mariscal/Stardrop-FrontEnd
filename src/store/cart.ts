import { create } from 'zustand';
import { type Data } from "@/types/data";
import { type Error } from '@/types/error';
import { type GarmentItem } from '@/types/garment-item';
import { makeOrder } from '@/services/order';
import { CustomException } from '@/exceptions/customException';

interface CartStore {
    cart: Array<GarmentItem>;
    loading?: boolean;
    error?: Error;
    addToCart: (item: GarmentItem) => void;
    removeFromCart: (item: GarmentItem) => void;
    makeOrder: (callback?: { onSuccess?: (response: Data) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
}

export const useCart = create<CartStore>((set, get) => ({
    cart: [],
    loading: false,
    error: null,
    addToCart: (item) => {
        set((state) => {
            const existingItemIndex = state.cart.findIndex(cartItem => cartItem.base?._id === item.base?._id && cartItem.size === item.size);
            
            if (existingItemIndex === -1) {
                return { cart: [...state.cart, item] };
            }

            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex].quantity += item.quantity;
            updatedCart[existingItemIndex].totalPrice += item.totalPrice;
            return { cart: updatedCart };
        });
    },
    removeFromCart: (item) => {
        set((state) => {
            const existingItemIndex = state.cart.findIndex(cartItem => cartItem.base?._id === item.base?._id && cartItem.size === item.size);
            
            if (existingItemIndex === -1) return state;
            
            const updatedCart = [...state.cart];
            updatedCart[existingItemIndex].quantity -= item.quantity;
            updatedCart[existingItemIndex].totalPrice -= item.totalPrice;

            if (updatedCart[existingItemIndex].quantity <= 0) {
                updatedCart.splice(existingItemIndex, 1);
            }

            return { cart: updatedCart };
        });
    },
    makeOrder: (callback) => {
        // set({ loading: true });
        // makeOrder(get().cart)
        // .then((response: Data) => {
        //      set((state) => ({
        //         cart: []
        //     }));
        //     if (callback?.onSuccess) callback.onSuccess(response);
        // }
        // ).catch((error) => {
        //         if (error instanceof CustomException) set({ error: error.detail });
        //         else set({ error: { message: error.message } });
        //         if (callback?.onError) callback.onError(get().error);
        //     }
        // ).finally(() => {
        //     set({ loading: false });
        //     if (callback?.onFinally) callback.onFinally();
        // });
    }
}));
