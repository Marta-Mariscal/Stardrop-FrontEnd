import { type Order } from "./order";
import { type User } from "./user";
import { type Wishlist } from "./wishlist";

export type Garment = {
    _id?: string;
    name: string;
    description: string;
    size: string;
    colors: string[];
    price: number;
    category: string;
    gender: string;
    image?: string;
    imageBlob?: any;
    type: string;
    web?: string;
    status?: string;
    owner?: User; 
    createdAt?: Date;
    updatedAt?: Date;
    __v?: number;

    orders?: Order[];
    wishlist?: Wishlist;
};
