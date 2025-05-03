import { redirect } from "react-router-dom";

// Services
import { getAuthToken } from "@/services/storage";

export const checkAuthLoader = () => {
    const token = getAuthToken();
    return token ? null : redirect("/login");
};

export const checkUnauthLoader = () => {
    const token = getAuthToken();
    return token ? redirect("/") : null;
};
