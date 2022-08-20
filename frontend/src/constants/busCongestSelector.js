/* eslint-disable consistent-return */
/* eslint-disable no-unused-vars */
/* eslint-disable import/prefer-default-export */
export const busCongestSelector = rerideNum => {
    switch (rerideNum) {
        case '0':
            return '데이터 없음';
        case '3':
            return '여유';
        case '4':
            return '보통';
        case '5':
            return '혼잡';
        default:
            break;
    }
};
