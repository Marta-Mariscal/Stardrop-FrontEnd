import { useEffect } from "react";
import { type Error } from "@/types/error";
import { useUser } from "@/store/user";
import { useCart } from "@/store/cart";
import { removeAuthToken } from "@/services/storage";
import { checkAuthLoader } from "@/loaders/auth";
import { redirect } from "react-router-dom";

export function UserProvider({ children }) {
    const whoami = useUser(state => state.whoami);
    const clearCart = useCart(state => state.clearCart);

    const onErrorHandler = (error: Error) => {
        if (error.status === 401) {
            removeAuthToken();
            clearCart();
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
