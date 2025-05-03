// TYPES
import { Credential } from "@/types/credential";
import { User } from "@/types/user";

// SERVICES
import { getAuthToken } from "./storage";

// EXCEPTIONS
import { CustomException } from "@/exceptions/customException";

// CONSTANTS
const BASE_URL = import.meta.env.BACKEND_BASE_URL || "http://localhost:3000";

// METHODS
export const login = async (credential: Credential) => {
    if (!credential || !credential.email || !credential.password) {
        throw new Error("Email and password are required");
    }

    const response = await fetch(`${BASE_URL}/users/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(credential)
    });

    const { data, error } = await response.json();

    if (!response.ok) {
        throw new CustomException(error);
    }

    return data;
};

export const signUp = async (user: User) => {
    if (!user) {
        throw new Error("User is required");
    }

    const response = await fetch(`${BASE_URL}/users/signup`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    });

    const { data, error } = await response.json();

    if (!response.ok) {
        throw new CustomException(error);
    }

    return data;
};

export const logout = async () => {
    const token = getAuthToken();

    if (!token) throw new Error("Token is required");

    const response = await fetch(`${BASE_URL}/users/logout`, {
        headers: {
            
        },
        method: 'POST',
        credentials: 'include'
    });

    const { data, error } = await response.json();

    if (!response.ok) {
        throw new CustomException(error);
    }

    return data;
};