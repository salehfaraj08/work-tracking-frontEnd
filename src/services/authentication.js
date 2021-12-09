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

export const logout = (next) => {
    deleteLocalStorage('token');
    deleteLocalStorage('user');

    next();
};

