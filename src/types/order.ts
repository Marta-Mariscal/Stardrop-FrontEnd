import { type OrderItem } from "./order-item";
import { type User } from "./user";

export type Order = {
    _id: string;
    owner: User;
    date: Date;
    orderItems: OrderItem[];
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
};
