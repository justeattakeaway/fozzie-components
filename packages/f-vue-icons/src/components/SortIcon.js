export default {
    name: 'SortIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 10" class="c-ficon c-ficon--sort" {...ctx.data}><path d="M.44.89a.44.44 0 0 1 0-.89h15.12a.44.44 0 0 1 0 .89H.44zm0 4.44a.44.44 0 0 1 0-.89h9.78a.44.44 0 1 1 0 .9H.44zm0 4.45a.44.44 0 0 1 0-.9H4.9a.44.44 0 1 1 0 .9H.44z"></path></svg>;
    }
};
