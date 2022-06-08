/* eslint-disable import/prefer-default-export */
export const scrollToBottom = element => {
    const el = element || window;
    el.scrollBy({ top: el.scrollHeight || 99999, behavior: 'smooth' });
};
