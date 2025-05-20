import { CustomException } from "@/exceptions/customException";
import { Data } from "@/types/data";
import { Garment } from "@/types/garment";

const BASE_URL = import.meta.env.BACKEND_BASE_URL || "http://localhost:3000";

export const makeOrder: (garments: Array<Garment>) => Promise<Data> = async (garments) => {
    if (!garments) throw new CustomException({ message: "There is no garments to make an order" });

    const response = await fetch(`${BASE_URL}/order`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(garments)
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data;
};