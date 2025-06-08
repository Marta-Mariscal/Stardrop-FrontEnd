import { type Garment } from "./garment";

export type GarmentItem = {
    base?: Garment;
    size?: string;
    quantity?: number;
    unitPrice?: number;
};
