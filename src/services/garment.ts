import { type Garment } from "@/types/garment";
import { getAuthToken } from "./storage";
import { CustomException } from "@/exceptions/customException";
import { GarmentServiceParams } from "@/types/garment-service-params";

const BASE_URL = import.meta.env.BACKEND_BASE_URL || "https://stardrop-backend.onrender.com";

const getUrlParams = (params?: GarmentServiceParams) => {
    if (!params) return '';

    let output = [];

    if (params?.search) {
        output.push(`search=${params.search}`);
    }

    if (params?.categories) {
        output.push(`categories=${params.categories.join(",")}`);
    }

    if (params?.genders) {
        output.push(`genders=${params.genders.join(",")}`);
    }

    if (params?.types) {
        output.push(`types=${params.types.join(",")}`);
    }

    if (params?.colors) {
        output.push(`colors=${params.colors.join(",")}`);
    }

    if (params?.states) {
        output.push(`states=${params.states.join(",")}`);
    }

    if (params?.minPrice) {
        output.push(`minPrice=${params.minPrice}`);
    }

    if (params?.maxPrice) {
        output.push(`maxPrice=${params.maxPrice}`);
    }

    if (params?.me) {
        output.push(`me=${params.me}`);
    }

    if (params?.garmentBase) {
        output.push(`garmentBase=${params.garmentBase}`);
    }

    if (params?.sortBy) {
        output.push(`sortBy=${params.sortBy}`);
    }

    if (params?.limit) {
        output.push(`limit=${params.limit}`);
    }

    if (params?.skip) {
        output.push(`skip=${params.skip}`);
    }

    return output.length ? `?${output.join("&")}` : '';
}

export const getGarments: (params?: GarmentServiceParams) => Promise<Array<Garment>> = async (params) => {
    const token = getAuthToken();

    if (!token) throw new CustomException({ message: "Token is required" });

    const response = await fetch(`${BASE_URL}/garment${getUrlParams(params)}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET'
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data.garments;
}

export const postGarment: (garment: Garment) => Promise<Garment> = async (garment) => {
    const token = getAuthToken();

    if (!token) throw new CustomException({ message: "Token is required" });

    const garmentData = new FormData();
    if (garment.imageBlob) {
        garmentData.append("image", garment.imageBlob);
        delete garment.imageBlob;
    }
    garmentData.append("garment", JSON.stringify(garment));

    const response = await fetch(`${BASE_URL}/garment`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'POST',
        body: garmentData
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data.garment;
}

export const getNewGarments: (params?: GarmentServiceParams) => Promise<Array<Garment>> = async (params) => {
    const token = getAuthToken();

    params.types = ["new"];

    if (!token) throw new CustomException({ message: "Token is required" });

    const response = await fetch(`${BASE_URL}/garment${getUrlParams(params)}`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET'
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data.garments;
}
