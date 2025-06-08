import { create } from "zustand";
import { type Error } from "@/types/error";
import { type Order } from "@/types/order";
import { getOrders } from "@/services/order";
import { CustomException } from "@/exceptions/customException";

interface OrdersStore {
    orders: Array<Order>;
    loading?: boolean;
    error?: Error;
    getOrders: (callback?: { onSuccess?: (response: Array<Order>) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
}

export const useOrders = create<OrdersStore>((set, get) => ({
    orders: [],
    loading: false,
    error: null,
    getOrders: (callback) => {
        set({ error: null });
        set({ loading: true });
        getOrders()
            .then((response: Array<Order>) => {
                set({ orders: response });
                if (callback?.onSuccess) callback.onSuccess(get().orders);
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
