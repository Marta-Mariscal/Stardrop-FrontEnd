import { json, redirect } from "react-router-dom";
import { getAuthToken } from "@/services/storage";

export const checkAuthLoader = () => {
    const token = getAuthToken();
    return token ? null : redirect("/login");
};

export const checkUnauthLoader = () => {
    const token = getAuthToken();
    return token ? redirect("/") : null;
};

export const getGarmentByIdLoader = async ({ params }: { params: any }) => {
    const token = getAuthToken();
    console.log("Token:", token);

    const { id } = params;
    console.log("Garment ID:", id);

    const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/garment/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    if (!response.ok) {
        throw json(
            { message: "Could not fetch the garment!" },
            {
                status: 500
            }
        );
    }

    const data = await response.json();
    return data;
};
