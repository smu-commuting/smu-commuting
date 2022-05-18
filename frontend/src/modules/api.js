// /* eslint-disable import/prefer-default-export */
// import axios from 'axios';

// axios.defaults.baseURL = process.env.REACT_APP_API_KEY;
// axios.defaults.withCredentials = true;

// // 인증번호 요청 API
// export const sendNumberAPI = async studentId => {
//     const resSendNumberAPI = await axios.post(
//         `/api/user/email`,
//         JSON.stringify(`${studentId}@sangmyung.kr`),
//         {
//             headers: {
//                 'Content-Type': `application/json`,
//                 Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//             },
//         },
//     );
//     // console.log(resSendNumberAPI);
//     return resSendNumberAPI;
// };

// // 인증번호 검증 API
// export const postAuthNumAPI = async authNum => {
//     const resPostAuthNum = await axios.post(
//         `/api/user/email/verification`,
//         JSON.stringify(authNum),
//         {
//             headers: {
//                 'Content-Type': `application/json`,
//                 Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
//             },
//         },
//     );
//     console.log(resPostAuthNum);
//     return resPostAuthNum;
// };
