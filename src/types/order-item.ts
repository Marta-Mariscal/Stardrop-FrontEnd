import { type Garment } from "./garment";
import { type Order } from "./order";

export type OrderItem = {
    _id: string;
    order: Order;
    garment: Garment;
    size: string;
    quantity: number;
    unitPrice: number;
    createdAt: Date;
    updatedAt: Date;
};
