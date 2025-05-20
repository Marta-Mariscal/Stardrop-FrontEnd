import { json } from "react-router-dom";
import { getAuthToken } from "@/services/storage";

const BASE_URL = import.meta.env.BACKEND_BASE_URL || "http://localhost:3000";

export const getGarmentByIdLoader = async ({ params }) => {
    const token = getAuthToken();
    if (!token) throw json({ message: "Token is required" });

    const { id } = params;

    const response = await fetch(`${BASE_URL}/garment/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: "GET"
    });

    const { data, error } = await response.json();

    if (!response.ok) {
        throw json({ ...error });
    }

    return data.garment;
};
