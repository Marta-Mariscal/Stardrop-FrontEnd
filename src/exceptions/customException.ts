import { type Error } from "@/types/error";

export class CustomException extends Error {
    detail: Error;

    constructor(detail: Error) {
        super(detail.message);
        this.detail = detail;
    }
}
