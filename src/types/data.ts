import { type GarmentItem } from "./garment-item";
import { type User } from "./user";

export type Data = {
    message?: string;
    user?: User;
    token?: string;
    cart?: GarmentItem[];
};
