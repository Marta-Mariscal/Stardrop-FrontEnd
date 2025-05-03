import { type Garment } from "./garment";
import { type User } from "./user";

export type Wishlist = {
    _id: string;
    owner: User;
    garments: Garment[];
    createdAt: Date;
    updatedAt: Date;
};
