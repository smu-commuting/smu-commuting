/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
import axios from 'axios';

export function setInterceptors(instance) {
    instance.interceptors.request.use(
        res => {
            res.headers.Authorization = `Bearer ${axios.defaults.headers.common.Authorization}`;
            return res;
        },
        err => Promise.reject(err),
    );

    instance.interceptors.response.use(
        res => res,
        err => {
            const { config, response } = err;
            const originalRequest = config;
            if (
                response.data.error.type ===
                'InsufficientAuthenticationException'
            ) {
                return axios
                    .post(`${process.env.REACT_APP_API_URL}/api/auth/refresh`)

                    .then(res => {
                        axios.defaults.headers.common.Authorization =
                            res.data.data.accessToken;
                    })
                    .then(() => {
                        originalRequest.headers.Authorization = `Bearer ${axios.defaults.headers.common.Authorization}`;
                        return axios(originalRequest);
                    })
                    .catch(err => {
                        window.location.replace('/');
                        localStorage.clear();
                    });
            }
            return Promise.reject(err);
        },
    );
    return instance;
}
