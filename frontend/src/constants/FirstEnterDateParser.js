/* eslint-disable import/prefer-default-export */
export function firstEnterDateParser() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const second = now.getSeconds();
    const result = `${year}-${month >= 10 ? month : `0${month}`}-${
        date >= 10 ? date : `0${date}`
    }T${hour >= 10 ? hour : `0${hour}`}:${
        minute >= 10 ? minute : `0${minute}`
    }:${second >= 10 ? second : `0${second}`}`;
    return result;
}
