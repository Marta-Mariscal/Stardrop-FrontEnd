import { create } from 'zustand';import { type Credential } from "@/types/credential";
import { type User } from "@/types/user";
import { type UserToken } from '@/types/userToken';
import { type Data } from '@/types/data';
import { type Error } from '@/types/error';
import { login, signUp, logout, whoami, update } from '@/services/user';
import { removeAuthToken, setAuthToken } from '@/services/storage';
import { CustomException } from '@/exceptions/customException';

interface UserStore {
    user: User;
    loading?: boolean;
    error?: Error;
    whoami: (callback?: { onSuccess?: (response: User) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
    login: (credential: Credential, callback?: { onSuccess?: (response: User) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
    signUp: (user: User, callback?: { onSuccess?: (response: User) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
    logout: (callback?: { onSuccess?: (response: Data) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
    update: (user: User, callback?: { onSuccess?: (response: User) => void; onError?: (error: Error) => void; onFinally?: () => void }) => void;
}

export const useUser = create<UserStore>((set, get) => ({
        user: null,
        loading: false,
        error: null,
        whoami: (callback) => {
            set({ error: null });
            set({ loading: true });
            whoami()
            .then((response: User) => {
                set({ user: response });
                if (callback?.onSuccess) callback.onSuccess(get().user);
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
        },
        login: (credential, callback) => {
            set({ error: null });
            set({ loading: true });
            login(credential)
            .then((response: UserToken) => {
                setAuthToken(response.token);
                set({ user: response.user });
                if (callback?.onSuccess) callback.onSuccess(get().user);
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
        },
        signUp: (user, callback) => {
            set({ error: null });
            set({ loading: true });
            signUp(user)
            .then((response: UserToken) => {
                setAuthToken(response.token);
                set({ user: response.user });
                if (callback?.onSuccess) callback.onSuccess(get().user);
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
        },
        logout: (callback) => {
            set({ error: null });
            set({ loading: true });
            logout()
            .then((response: Data) => {
                set({ user: null });
                removeAuthToken();
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
        },
        update: (user, callback) => {
            set({ error: null });
            set({ loading: true });
            update(user)
            .then((response: User) => {
                set({ user: response });
                if (callback?.onSuccess) callback.onSuccess(get().user);
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