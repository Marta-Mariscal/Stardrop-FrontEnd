import { Garment } from "./garment";
import { User } from "./user";

export type Wishlist = {
    _id: String;
    owner: User;
    garments: Garment[];
    createdAt: Date;
    updatedAt: Date;
};
