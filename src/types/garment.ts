import { type Order } from "./order";
import { type User } from "./user";
import { type Wishlist } from "./wishlist";

export type Garment = {
    _id: string;
    name: string;
    description: boolean;
    size: string;
    colors: {
        color: "red" | "pink" | "purple" | "blue" | "green" | "yellow" | "orange" | "brown" | "black" | "white";
    }[];
    price: number;
    category: "shirt" | "pant" | "dress" | "outerwear" | "accessory" | "other" | "footwear";
    gender: "man" | "woman" | "unisex" | "child";
    image?: string;
    type: "new" | "second-hand";
    web?: string;
    status: "Brand New" | "Like new" | "Used" | "Fair condition" | "Damaged";
    owner: User; 
    createdAt: Date;
    updatedAt: Date;

    orders?: Order[];
    wishlist?: Wishlist;
};
