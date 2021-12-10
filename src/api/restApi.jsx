import axios from 'axios'
const api = axios.create({
    baseURL: "http://localhost:5001/api",
    headers: {
        'Content-Type': 'application/json',
    },
});


export const logOut = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('client token', token);
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token ? `Bearer ${token}` : ''
        }
    }
    try {
        return await api.post('workers/logout', {}, headers);

    } catch (err) {
        console.log('error:', err.response);
    }
}

export const addWorker = async (worker) => {
    console.log("worker:", worker);
    const token = JSON.parse(localStorage.getItem('token'));
    console.log('client token', token);
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token ? `Bearer ${token}` : ''
        }
    }
    try {
        return await api.post('workers/addUser', worker, headers);
    } catch (err) {
        console.log(err.response);
        return err;
    }
}

export const getToken = async () => {
    const token = JSON.parse(localStorage.getItem('token'));
    let headers = {
        headers: {
            'Content-Type': 'application/json',
            'authorization': token ? `Bearer ${token}` : ''
        }
    }
    try {
        console.log("headers", headers);
        const response = await api.get('workers/token', headers);
        if (response.status === 200) {
            return true;
        }
    } catch (err) {
        console.log(err.response);
        if (err.response.status === 403)
            return false;
    }
}
