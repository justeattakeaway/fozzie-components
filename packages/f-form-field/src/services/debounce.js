export default function debounce (fn, delay, ...args) {
    return () => {
        let timeoutId = null;
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
