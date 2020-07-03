export default {
    name: 'SocialRssIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" class="c-ficon c-ficon--social-rss" {...ctx.data}><path fill="#535353" d="M9.333 7a.583.583 0 1 1 .001-1.167c7.084.008 12.825 5.75 12.833 12.833a.583.583 0 1 1-1.167.001C20.993 12.227 15.773 7.007 9.333 7zm0 4.594a.583.583 0 1 1 .001-1.166 8.248 8.248 0 0 1 8.238 8.238.583.583 0 1 1-1.166.001 7.082 7.082 0 0 0-7.073-7.073zM9.917 21a2.917 2.917 0 1 1 0-5.833 2.917 2.917 0 0 1 0 5.833zm0-1.167a1.75 1.75 0 1 0 0-3.5 1.75 1.75 0 0 0 0 3.5zM14 28C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14zm0-1.167c7.088 0 12.833-5.745 12.833-12.833S21.088 1.167 14 1.167 1.167 6.912 1.167 14 6.912 26.833 14 26.833z"></path></svg>;
    }
};
