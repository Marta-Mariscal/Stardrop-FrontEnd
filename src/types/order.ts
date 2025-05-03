import { type Garment } from "./garment";
import { type User } from "./user";

export type Order = {
    _id: string;
    owner: User;
    date: Date;
    garments: Garment[];
    createdAt: Date;
    updatedAt: Date;
};
