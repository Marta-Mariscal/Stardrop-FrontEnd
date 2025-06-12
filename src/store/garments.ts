import { create } from "zustand";
import { type Error } from "@/types/error";
import { type Garment } from "@/types/garment";
import { type GarmentServiceParams } from "@/types/garment-service-params";
import { getGarments, postGarment } from "@/services/garment";
import { CustomException } from "@/exceptions/customException";

interface GarmentsStore {
    garments: Array<Garment>;
    loading?: boolean;
    error?: Error;
    getGarments: (filters?: GarmentServiceParams, callback?: { onSuccess?: (response: Array<Garment>) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
    postGarment: (garment: Garment, callback?: { onSuccess?: (response: Garment) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
    getNewGarments: (
        filters?: GarmentServiceParams,
        callback?: { onSuccess?: (response: Array<Garment>) => void; onError?: (error: Error) => void; onFinally?: () => void }
    ) => void;
}

export const useGarments = create<GarmentsStore>((set, get) => ({
    garments: null,
    loading: false,
    error: null,
    getGarments: (filters, callback) => {
        set({ error: null });
        set({ loading: true });
        getGarments(filters)
            .then((response: Array<Garment>) => {
                set({ garments: response });
                if (callback?.onSuccess) callback.onSuccess(get().garments);
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
    postGarment: (garment, callback) => {
        set({ error: null });
        set({ loading: true });
        postGarment(garment)
            .then((response: Garment) => {
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
    getNewGarments: (filters, callback) => {
        set({ error: null });
        set({ loading: true });
        getGarments(filters)
            .then((response: Array<Garment>) => {
                set({ garments: response });
                if (callback?.onSuccess) callback.onSuccess(get().garments);
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
