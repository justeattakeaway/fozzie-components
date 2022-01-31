import RenderlessSlotWrapper from '../../../components/RenderlessSlotWrapper';

export default {
    props: {
        // An optional safeguard component to wrap around restaurant card data points such as ratings, cuisines etc.
        errorBoundary: {
            type: Object,
            default: RenderlessSlotWrapper // by default returns a renderless component that will just render it's slot and not bloat markup
        }
    }
};
