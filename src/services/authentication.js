const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
};
export const isAuthenticated = () => {
    if (getLocalStorage('token') && getLocalStorage('user')) {
        return getLocalStorage('user');
    }
    return false;
}