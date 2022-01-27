//  This renderless component is designed to simply render it's default slot.
//  This is so that it can be used as part of 'conditional' dynamic components
export default {
    name: 'Renderless',
    functional: true,
    render (_, { children }) {
        return children;
    }
};
