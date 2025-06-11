import { create } from "zustand";
import { type Data } from "@/types/data";
import { type Error } from "@/types/error";
import { type Garment } from "@/types/garment";
import { getWishlist, addToWishlist, removeFromWishlist } from "@/services/wishlist";
import { CustomException } from "@/exceptions/customException";

interface WishlistStore {
    wishlist: Array<Garment>;
    loading?: boolean;
    error?: Error;
    getWishlist: (callback?: { onSuccess?: (response: Array<Garment>) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
    addToWishlist: (id: string, callback?: { onSuccess?: (response: Data) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
    removeFromWishlist: (id: string, callback?: { onSuccess?: (response: Data) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
}

export const useWishlist = create<WishlistStore>((set, get) => ({
    wishlist: [],
    loading: false,
    error: null,
    getWishlist: (callback) => {
        set({ error: null });
        set({ loading: true });
        getWishlist()
            .then((response: Array<Garment>) => {
                set({ wishlist: response });
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
    },
    addToWishlist: (id, callback) => {
        set({ error: null });
        set({ loading: true });
        addToWishlist(id)
            .then((response: Data) => {
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
    },
    removeFromWishlist: (id, callback) => {
        set({ error: null });
        set({ loading: true });
        removeFromWishlist(id)
            .then((response: Data) => {
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
}));
