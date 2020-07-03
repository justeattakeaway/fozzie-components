export default {
    name: 'CollectionIcon',

    props: {
        isWhite: {
            type: Boolean,
            default: false
        },

        isBlue: {
            type: Boolean,
            default: false
        },

        isGreen: {
            type: Boolean,
            default: false
        },

        isOrange: {
            type: Boolean,
            default: false
        },

        pushLeft: {
            type: Boolean,
            default: false
        }
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;
        ctx.data.class = {
            'c-ficon--white': ctx.props.isWhite,
            'c-ficon--blue': ctx.props.isBlue,
            'c-ficon--green': ctx.props.isGreen,
            'c-ficon--orange': ctx.props.isOrange,
            'c-ficon--pushLeft': ctx.props.pushLeft
        };

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c-ficon c-ficon--collection" {...ctx.data}><path d="M10.6 19.2l.3-.5.5-1.7a.5.5 0 0 1 1 .3l-.5 1.6a2.3 2.3 0 0 1-.6 1l-2.7 2.7a.5.5 0 0 1-.7 0l-1.8-1.7a.5.5 0 0 1 0-.8l1.7-1.6.4-.7 1-3.3a.5.5 0 0 1 .9.3L9 18c0 .4-.3.8-.6 1.1l-1.3 1.3 1 1 2.4-2.3zm2.3-10a.5.5 0 0 1 .9-.6c1.4 2.5 2.4 3.4 4.7 3.4a.5.5 0 1 1 0 1c-2.7 0-4-1-5.6-3.8zM11.5 7a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm0-1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm-1.4 7.5v.1c0 2 .2 2.4 2.4 3a2.8 2.8 0 0 1 1.8 2.1L15 21h1.3l-.6-3a4 4 0 0 0-1-2l-1.4-1.1a.5.5 0 0 1-.2-.4v-5a.5.5 0 0 0-.5-.6l-2.4.1v4.5zm-3.4-2.3a5 5 0 0 0-.6 1.6l-.1.7a.5.5 0 1 1-1 0l.1-.9a6 6 0 0 1 .8-2C7 8.9 9.2 7.8 12.6 8A1.5 1.5 0 0 1 14 9.4v4.9l1.2.9a5 5 0 0 1 1.4 2.5l.7 3.7a.5.5 0 0 1-.5.6h-2.3a.5.5 0 0 1-.5-.4l-.7-2.7a1.8 1.8 0 0 0-1.1-1.3C9.6 16.8 9 16 9 13.6V9.3c-1 .4-1.9 1-2.4 1.9z"></path></svg>;
    }
};
