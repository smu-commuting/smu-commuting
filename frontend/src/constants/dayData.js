/* eslint-disable prettier/prettier */
/* eslint-disable import/prefer-default-export */
export const day = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28,
];

export const monthDay = {
    1: [...day, 29, 30, 31],
    2: [...day],
    3: [...day, 29, 30, 31],
    4: [...day, 29, 30],
    5: [...day, 29, 30, 31],
    6: [...day, 29, 30],
    7: [...day, 29, 30, 31],
    8: [...day, 29, 30, 31],
    9: [...day, 29, 30],
    10: [...day, 29, 30, 31],
    11: [...day, 29, 30],
    12: [...day, 29, 30, 31],
};

export const hoursArr = [12, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
export const minutesArr = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55];
