// Types
import { type Garment } from "@/types/garment";

// Services
import { getAuthToken } from "./storage";

// Exceptions
import { CustomException } from "@/exceptions/customException";

// Constants
const BASE_URL = import.meta.env.BACKEND_BASE_URL || "http://localhost:3000";

export const getGarments: () => Promise<Garment> = async () => {
    const token = getAuthToken();

    if (!token) throw new CustomException({ message: "Token is required" });

    const response = await fetch(`${BASE_URL}/garment?`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET'
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data.user;
}