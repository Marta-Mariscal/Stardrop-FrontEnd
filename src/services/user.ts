import { Credential } from "@/types/credential";
import { User } from "@/types/user";

// CONSTANTS
const BASE_URL = import.meta.env.BACKEND_BASE_URL || "http://localhost:3000";

// METHODS
export const login = async (credential: Credential) => {
    if (!credential || !credential.email || !credential.password) {
        throw new Error("Credential is required");
    }

    const response = await fetch(`${BASE_URL}/users/login`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(credential)
    });

    if (!response.ok) {
        throw new Error("User or password is incorrect");
    }

    const { data, error } = await response.json();

    if (error) {
        throw new Error(error);
    }

    return data;
};

export const signUp = async (user: User) => {
    if (!user) {
        throw new Error("User is required");
    }

    console.log("User signup: ", user);
    const response = await fetch(`${BASE_URL}/users/signup`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user)
    });

    console.log("Response: ", response);

    if (!response.ok) {
        throw new Error("Error signing up");
    }

    const { data, error } = await response.json();
    
    if (error) {
        throw new Error(error);
    }

    return data;
};