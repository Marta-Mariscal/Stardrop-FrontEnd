import { type Data } from "@/types/data";
import { type Garment } from "@/types/garment";
import { getAuthToken } from "./storage";
import { CustomException } from "@/exceptions/customException";

const BASE_URL = import.meta.env.BACKEND_BASE_URL || "http://localhost:3000";

export const getWishlist: () => Promise<Garment[]> = async () => {
    const token = getAuthToken();

    if (!token) throw new CustomException({ message: "Token is required" });

    const response = await fetch(`${BASE_URL}/wishlist`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET'
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data.wishlist;
}

export const addToWishlist: (id: string) => Promise<Data> = async (id) => {
    const token = getAuthToken();

    if (!token) throw new CustomException({ message: "Token is required" });

    const response = await fetch(`${BASE_URL}/wishlist/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'POST'
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data;
}

export const removeFromWishlist: (id: string) => Promise<Data> = async (id) => {
    const token = getAuthToken();

    if (!token) throw new CustomException({ message: "Token is required" });

    const response = await fetch(`${BASE_URL}/wishlist/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'DELETE'
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data;
}
