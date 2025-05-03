import { type Data } from "./data";
import { type Error } from "./error";

export type DataError = {
    data?: Data;
    error?: Error;
}