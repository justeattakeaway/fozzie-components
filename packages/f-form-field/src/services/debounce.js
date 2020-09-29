export default function debounce (fn, delay, ...args) {
    let timeoutId = null;

    return () => {
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}
