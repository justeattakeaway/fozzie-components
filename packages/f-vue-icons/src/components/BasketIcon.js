export default {
    name: 'BasketIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c-ficon c-ficon--basket" {...ctx.data}><path d="M17.5 8l-2.4-3.2a.5.5 0 0 1 .8-.6L18.7 8h2.8a.5.5 0 1 1 0 1h-1.1l-1.7 9.8a1.5 1.5 0 0 1-1.4 1.2H6.7a1.5 1.5 0 0 1-1.4-1.2L3.6 9H2.5a.5.5 0 0 1 0-1h2.8L8 4.2a.5.5 0 0 1 .8.6L6.5 8h11zm1 1h-14l1.7 9.6c0 .2.3.4.5.4h10.6a.5.5 0 0 0 .4-.4L19.4 9h-.9zm-7 2.5a.5.5 0 1 1 1 0v5a.5.5 0 1 1-1 0v-5zm-3.5 0a.5.5 0 0 1 1 0l.5 5a.5.5 0 0 1-1 0l-.5-5zm7 0a.5.5 0 1 1 1 0l-.5 5a.5.5 0 1 1-1 0l.5-5z"></path></svg>;
    }
};
