import { Garment } from "./garment";
import { Order } from "./order";
import { Wishlist } from "./wishlist";

export type User = {
    _id: String;
    name: String;
    email: String;
    password: String;
    address: String;
    phone: String;
    type: "customer" | "company";
    description?: String;
    web?: String;
    cardNumber?: String;
    cardExpirationDate?: String; 
    cardHolderName?: String;
    cardCVV?: String;
    token: String;
    icon?: String;
    createdAt: Date;
    updatedAt: Date;

    garments?: Garment[];
    orders?: Order[];
    wishlist?: Wishlist;
}
