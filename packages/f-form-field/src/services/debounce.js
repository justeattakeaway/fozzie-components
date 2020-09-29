module.exports = function debounce (fn, delay, ...args) {
    let timeoutID = null;

    return () => {
        clearTimeout(timeoutID);

        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
};
