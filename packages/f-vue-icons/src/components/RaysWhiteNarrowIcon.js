export default {
    name: 'RaysWhiteNarrowIcon',

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

        isDarkestGrey: {
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
            'c-ficon--grey--darkest': ctx.props.isDarkestGrey,
            'c-ficon--pushLeft': ctx.props.pushLeft
        };

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 36" class="c-ficon c-ficon--rays-white-narrow" {...ctx.data}><g fill="none"><g opacity=".3"><path fill="#000" d="M0 0l320 36H0z"></path><path fill="#FFF" d="M0 0l320 36H0z"></path></g><path fill="#FFF" d="M0 12l320 24H0z" opacity=".6"></path><path fill="#FFF" d="M0 24l320 12H0z"></path></g></svg>;
    }
};
