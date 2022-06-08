/* eslint-disable import/prefer-default-export */
/* eslint-disable no-unused-expressions */
export default function prevent(fn, defaultOnly) {
    return (e, ...params) => {
        e && e.preventDefault();
        !defaultOnly && e && e.stopPropagation();
        fn(e, ...params);
    };
}
