/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
// import axios from 'axios';

// export function setInterceptors(instance) {
//     // 요청 인터셉트
//     instance.interceptors.request.use(
//         res => {
//             res.headers.Authorization = `Bearer ${axios.defaults.headers.common.Authorization}`;
//             return res;
//         },
//         err => Promise.reject(err),
//     );

//     // 응답 인터셉트

//     instance.interceptors.response.use(
//         res => res,
//         err => {
//             const { config, response } = err;
//             const originalRequest = config;
//             if (
//                 response.data.error.type ===
//                 'InsufficientAuthenticationException'
//             ) {
//                 console.log('들어옴');
//                 return axios
//                     .post(`${process.env.REACT_APP_API_URL}/api/auth/refresh`)
//                     .then(res => {
//                         console.log('레스', res);
//                         axios.defaults.headers.common.Authorization =
//                             res.data.data.accessToken;
//                     })
//                     .then(() => {
//                         originalRequest.headers.Authorization = `Bearer ${axios.defaults.headers.common.Authorization}`;
//                         return axios(originalRequest);
//                     })
//                     .catch(err => {
//                         console.log(
//                             `Bearer ${axios.defaults.headers.common.Authorization}`,
//                         );
//                         console.log(originalRequest);
//                     });
//             }
//             return Promise.reject(err);
//         },
//     );
//     return instance;
// }

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
                return axios({
                    method: 'POST',
                    url: `${process.env.REACT_APP_API_URL}/api/auth/refresh`,
                    headers: {
                        Authorization: `Bearer ${axios.defaults.headers.common.Authorization}`,
                    },
                })
                    .then(res => {
                        console.log('1차');
                        axios.defaults.headers.common.Authorization =
                            res.data.data.accessToken;
                    })
                    .then(() => {
                        console.log('2차');
                        originalRequest.headers.Authorization = `Bearer ${axios.defaults.headers.common.Authorization}`;
                        return axios(originalRequest);
                    })
                    .catch(err => {
                        // window.location.replace('/');
                        console.log('에러');
                        // originalRequest.headers.Authorization = `Bearer ${axios.defaults.headers.common.Authorization}`;
                        // return axios(originalRequest);
                    });
            }
            return Promise.reject(err);
        },
    );
    return instance;
}
