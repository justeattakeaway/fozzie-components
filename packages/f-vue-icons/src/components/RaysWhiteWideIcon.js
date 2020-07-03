export default {
    name: 'RaysWhiteWideIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 48" class="c-ficon c-ficon--rays-white-wide" {...ctx.data}><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0l1280 48H0z" opacity=".3"></path><path fill="#FFF" d="M0 16l1280 32H0z" opacity=".6"></path><path fill="#F5F5F5" d="M0 32l1280 16H0z"></path></g></svg>;
    }
};
