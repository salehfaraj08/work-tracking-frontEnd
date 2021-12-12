import { getToken } from "../api/restApi";
const deleteLocalStorage = (key) => {
    localStorage.removeItem(key);
};

const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const setAuthentication = (token, user) => {
    setLocalStorage('token', token);
    setLocalStorage('user', user);
};

export const isAuthenticated = () => {
    if (getLocalStorage('token') && getLocalStorage('user')) {
        return getLocalStorage('user');
    }
    return false;
}

export const getUser = () => {
    return getLocalStorage('user');
}

export const isAuthenticatedToken = async () => {
    const token = await getToken();
    console.log("isAuthenticated", token);
    if (!token) {
        deleteLocalStorage('token');
        deleteLocalStorage('user');
        return false;
    }
    return true;
}

export const logout = (next) => {
    deleteLocalStorage('token');
    deleteLocalStorage('user');
    next();
};

