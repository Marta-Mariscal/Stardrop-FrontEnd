// TYPES
import { type Credential } from "@/types/credential";
import { type UserToken } from "@/types/userToken";
import { type User } from "@/types/user";
import { type Data } from "@/types/data";

// SERVICES
import { getAuthToken } from "./storage";

// EXCEPTIONS
import { CustomException } from "@/exceptions/customException";

// CONSTANTS
const BASE_URL = import.meta.env.BACKEND_BASE_URL || "http://localhost:3000";

// METHODS
export const whoami: () => Promise<User> = async () => {
    const token = getAuthToken();

    if (!token) throw new CustomException({ message: "Token is required" });

    const response = await fetch(`${BASE_URL}/users/me`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'GET'
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data.user;
}

export const login: (credential: Credential) => Promise<UserToken> = async (credential: Credential) => {
    if (!credential || !credential.email || !credential.password) throw new Error("Email and password are required");

    const response = await fetch(`${BASE_URL}/users/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(credential)
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data;
};

export const signUp: (user: User) => Promise<UserToken> = async (user: User) => {
    if (!user) throw new Error("User is required");

    const response = await fetch(`${BASE_URL}/users/signup`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data;
};

export const logout: () => Promise<Data> = async () => {
    const token = getAuthToken();

    if (!token) throw new CustomException({ message: "Token is required" });

    const response = await fetch(`${BASE_URL}/users/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        },
        method: 'POST',
        credentials: 'include'
    });

    const { data, error } = await response.json();

    if (!response.ok) throw new CustomException(error);

    return data;
};