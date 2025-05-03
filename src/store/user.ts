// Zustand
import { create } from 'zustand';

// Types
import { type Credential } from "@/types/credential";
import { type User } from "@/types/user";
import { type UserToken } from '@/types/userToken';
import { type Data } from '@/types/data';
import { type Error } from '@/types/error';

// Services
import { login, signUp, logout } from '@/services/user';
import { removeAuthToken, setAuthToken } from '@/services/storage';
import { CustomException } from '@/exceptions/customException';

// Local Types
interface UserStore {
    user: User;
    loading?: boolean;
    error?: Error;
    login: (credential: Credential, callback?: { onSuccess?: (response: UserToken) => void; onError?: (error: CustomException) => void; onFinally?: () => void }) => void;
    signUp: (user: User, callback?: { onSuccess?: (response: UserToken) => void; onError?: (error: CustomException) => void; onFinally?: () => void }) => void;
    logout: (callback?: { onSuccess?: (response: Data) => void; onError?: (error: CustomException) => void; onFinally?: () => void }) => void;
}

// Store
export const useUser = create<UserStore>((set) => ({
        user: null,
        loading: false,
        error: null,
        login: (credential, callback) => {
            set({ loading: true });
            login(credential)
            .then((response: UserToken) => {
                setAuthToken(response.token);
                set({ user: response.user });
                if (callback?.onSuccess) callback.onSuccess(response);
            }
            ).catch((error: CustomException) => {
                set({ error: error.detail });
                if (callback?.onError) callback.onError(error);
            }
            ).finally(() => {
                set({ loading: false });
                if (callback?.onFinally) callback.onFinally();
            });
        },
        signUp: (user, callback) => {
            set({ loading: true });
            signUp(user)
            .then((response: UserToken) => {
                setAuthToken(response.token);
                set({ user: response.user });
                if (callback?.onSuccess) callback.onSuccess(response);
            }
            ).catch((error: CustomException) => {
                set({ error: error.detail });
                if (callback?.onError) callback.onError(error);
            }
            ).finally(() => {
                set({ loading: false });
                if (callback?.onFinally) callback.onFinally();
            });
        },
        logout: (callback) => {
            set({ loading: true });
            logout()
            .then((response: Data) => {
                removeAuthToken();
                set({ user: null });
                if (callback?.onSuccess) callback.onSuccess(response);
            }
            ).catch((error: CustomException) => {
                set({ error: error.detail });
                if (callback?.onError) callback.onError(error);
            }
            ).finally(() => {
                set({ loading: false });
                if (callback?.onFinally) callback.onFinally();
            });
        }
}));