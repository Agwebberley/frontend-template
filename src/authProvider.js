import axios from 'axios';
import { AUTH_LOGIN, AUTH_LOGOUT, AUTH_ERROR, AUTH_CHECK, AUTH_GET_PERMISSIONS } from 'react-admin';
import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:8000/api';
const authUrl = `${apiUrl}/token/`;

export default (type, params) => {
    if (type === AUTH_LOGIN) {
        const { username, password } = params;
        return axios.post(authUrl, { username, password }, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(({ data }) => {
            if (data && data.access) {
                console.log(data);
                localStorage.setItem('token', data.access);
            }
            if (data && data.refresh) {
                localStorage.setItem('refreshToken', data.refresh);
            }
        });
    }
    if (type === AUTH_LOGOUT) {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        return Promise.resolve();
    }
    if (type === AUTH_ERROR) {
        const status = params.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return Promise.reject();
        }
        return Promise.resolve();
    }
    if (type === AUTH_CHECK) {
        return localStorage.getItem('token') ? Promise.resolve() : Promise.reject();
    }
    if (type === AUTH_GET_PERMISSIONS) {
        return Promise.resolve();
    }
    return Promise.reject('Unknown method');
};
