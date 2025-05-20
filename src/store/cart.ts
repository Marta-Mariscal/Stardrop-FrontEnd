import { create } from 'zustand';
import { type Data } from "@/types/data";
import { type Garment } from "@/types/garment";
import { type Error } from '@/types/error';
import { makeOrder } from '@/services/order';
import { CustomException } from '@/exceptions/customException';

interface CartStore {
    cart: Array<Garment>;
    loading?: boolean;
    error?: Error;
    addToCart: (garment: Garment) => void;
    removeFromCart: (garmentId: string) => void;
    makeOrder: (callback?: { onSuccess?: (response: Data) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
}

export const useCart = create<CartStore>((set, get) => ({
    cart: [],
    loading: false,
    error: null,
    addToCart: (garment) => {
        set((state) => ({
            cart: [...state.cart, garment]
        }));
    },
    removeFromCart: (garmentId) => {
        set((state) => ({
            cart: state.cart.filter((item) => item._id !== garmentId)
        }));
    },
    makeOrder: (callback) => {
        set({ loading: true });
        makeOrder(get().cart)
        .then((response: Data) => {
             set((state) => ({
                cart: []
            }));
            if (callback?.onSuccess) callback.onSuccess(response);
        }
        ).catch((error) => {
                if (error instanceof CustomException) set({ error: error.detail });
                else set({ error: { message: error.message } });
                if (callback?.onError) callback.onError(get().error);
            }
        ).finally(() => {
            set({ loading: false });
            if (callback?.onFinally) callback.onFinally();
        });
    }
}));
