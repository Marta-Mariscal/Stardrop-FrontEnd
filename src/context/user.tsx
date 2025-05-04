import { useEffect } from "react";

// Types
import { type Error } from "@/types/error";

// Stores
import { useUser } from "@/store/user";

// Services
import { removeAuthToken } from "@/services/storage";
import { checkAuthLoader } from "@/loaders/auth";
import { redirect } from "react-router-dom";

export function UserProvider({ children }) {
    const whoami = useUser(state => state.whoami);

    const onErrorHandler = (error: Error) => {
        if (error.status === 401) {
            removeAuthToken();
            redirect("/login");
        } else {
            checkAuthLoader();
        }
    }

    useEffect(() => {
        whoami({ onError: onErrorHandler });
    }, []);

    return <> {children} </>;
}
