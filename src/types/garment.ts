import { Order } from "./order";
import { User } from "./user";
import { Wishlist } from "./wishlist";

export type Garment = {
    _id: String;
    name: String;
    description: Boolean;
    size: String;
    colors: {
        color: "red" | "pink" | "purple" | "blue" | "green" | "yellow" | "orange" | "brown" | "black" | "white";
    }[];
    price: Number;
    category: "shirt" | "pant" | "dress" | "outerwear" | "accessory" | "other" | "footwear";
    gender: "man" | "woman" | "unisex" | "child";
    image?: String;
    type: "new" | "second-hand";
    web?: String;
    status: "Brand New" | "Like new" | "Used" | "Fair condition" | "Damaged";
    owner: User; 
    createdAt: Date;
    updatedAt: Date;

    orders?: Order[];
    wishlist?: Wishlist;
};
