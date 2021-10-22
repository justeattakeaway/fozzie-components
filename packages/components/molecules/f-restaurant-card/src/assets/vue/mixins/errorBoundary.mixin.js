const objectIsVueComponent = obj => 'render' in obj;

export default {
    props: {
        errorBoundary: {
            type: [Object, String],
            validator: value => (typeof value === 'object'
                ? objectIsVueComponent(value)
                : true),
            default: 'div'
        }
    }
};
