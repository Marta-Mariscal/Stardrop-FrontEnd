import { Garment } from "./garment";
import { User } from "./user";

export type Order = {
    _id: String;
    owner: User;
    date: Date;
    garments: Garment[];
    createdAt: Date;
    updatedAt: Date;
};
