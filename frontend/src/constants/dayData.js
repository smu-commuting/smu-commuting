/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
export const day = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
];

export const monthDay = {
    1: [...day, 30, 31],
    2: [...day],
    3: [...day, 30, 31],
    4: [...day, 30],
    5: [...day, 30, 31],
    6: [...day, 30],
    7: [...day, 30, 31],
    8: [...day, 30, 31],
    9: [...day, 30],
    10: [...day, 30, 31],
    11: [...day, 30],
    12: [...day, 30, 31],
};