import { type Garment } from "./garment";
import { type Order } from "./order";
import { type Wishlist } from "./wishlist";

export type User = {
    _id: string;
    name: string;
    email: string;
    password: string;
    address: string;
    phone: string;
    type: "customer" | "company";
    description?: string;
    web?: string;
    cardNumber?: string;
    cardExpirationDate?: string; 
    cardHolderName?: string;
    cardCVV?: string;
    icon?: string;
    createdAt: Date;
    updatedAt: Date;

    garments?: Garment[];
    orders?: Order[];
    wishlist?: Wishlist;
}
