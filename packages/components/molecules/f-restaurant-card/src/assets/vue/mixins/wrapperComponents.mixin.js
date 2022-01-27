export default {
    props: {
        // Optional components to wrap around restaurant card data points such as ratings, cuisines etc.
        wrapperComponents: {
            type: Object,
            default: () => ({})
        },
        // A configuration object containing what, if any, wrapper components should be used on a data point
        // as well as any required props for said wrapper component
        dataPointWrappers: {
            type: Object,
            default: () => ({})
        }
    }
};
