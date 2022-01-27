//  This renderless component is designed to simply render it's default slot.
//  This is so that it can be used as part of 'conditional' dynamic components
export default {
    render () {
        return this.$slots.default;
    }
};
