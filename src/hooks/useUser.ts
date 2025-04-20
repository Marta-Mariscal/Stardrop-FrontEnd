import { useContext, useState } from "react";

// Custom Context
import { UserContext } from "../context/user.jsx";

// Types
import { User } from "@/types/user.js";

// Services
import { login as loginService, signUp as signUpService } from "@/services/user.js";
import { setAuthToken } from "@/services/storage.js";

export const useUser = () => {
    const context = useContext(UserContext);

    if (context === undefined) {
        throw new Error("useUser must be used within a UserProvider");
    }

    const { user, setUser } = context;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const login = async ({ email, password }) => {
        setLoading(true);
        setError(null);

        try {
            let { user: res, token } = await loginService({ email, password });
            setAuthToken(token);
            setUser(res);
            setLoading(false);
            return { data: { user: res }, error: null };
        } catch (error) {
            setError(error);
            setLoading(false);
            return { data: null, error };
        }
    };

    const signUp = async (input: User) => {
        setLoading(true);
        setError(null);

        try {
            let { user: res, token } = await signUpService(input);
            setAuthToken(token);
            setUser(res);
            setLoading(false);
            return { data: { user: res }, error: null };
        } catch (error) {
            setError(error);
            setLoading(false);
            return { data: null, error };
        }
    };

    return {
        user,
        login,
        signUp,
        loading,
        error
    };
};
