import { CustomException } from "@/exceptions/customException";
import { type Order } from "@/types/order";
import { type GarmentItem } from "@/types/garment-item";
import { getAuthToken } from "./storage";

const BASE_URL = import.meta.env.BACKEND_BASE_URL || "http://localhost:3000";

export const makeOrder: (items: Array<GarmentItem>) => Promise<Order> = async (items) => {
    const token = getAuthToken();
    
    if (!token) throw new CustomException({ message: "Token is required" });
    if (!items?.length) throw new CustomException({ message: "There is no garments to make an order" });

    const response = await fetch(`${BASE_URL}/order`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(items)
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data;
};

export const getOrders: () => Promise<Array<Order>> = async () => {
    const token = getAuthToken();
    
    if (!token) throw new CustomException({ message: "Token is required" });

    const response = await fetch(`${BASE_URL}/order`, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        method: "GET"
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data.orders;
}
