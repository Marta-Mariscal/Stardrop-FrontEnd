export const getAuthToken = () => {
    const token = localStorage.getItem("token");

    if (!token) {
        return null;
    }

    return token;
};

export const setAuthToken = (token: string) => {
    localStorage.setItem("token", token);
};

export const removeAuthToken = () => {
    localStorage.removeItem("token");
};
