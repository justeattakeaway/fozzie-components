export default {
    props: {
        // An optional safeguard component to wrap around restaurant card data points such as ratings, cuisines etc.
        errorBoundary: {
            type: Object,
            default: null
        }
    }
};
