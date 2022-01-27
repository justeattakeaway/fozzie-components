export default {
    props: {
        // Optional components to wrap around restaurant card data points such as ratings, cuisines etc.
        wrapperComponents: {
            type: Object,
            default: () => ({})
        },
        // Optional props to pass to wrapper components such as an error boundary's tier
        wrapperComponentProps: {
            type: Object,
            default: () => ({})
        }
    }
};
