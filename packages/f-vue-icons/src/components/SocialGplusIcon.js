export default {
    name: 'SocialGplusIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" class="c-ficon c-ficon--social-gplus" {...ctx.data}><path fill="#535353" d="M21 12.833h1.75V14H21v1.75h-1.167V14h-1.75v-1.167h1.75v-1.75H21v1.75zM11.083 14a.583.583 0 1 1 0-1.167h4.667c.322 0 .583.261.583.584a5.25 5.25 0 1 1-1.538-3.712.583.583 0 1 1-.825.825A4.083 4.083 0 1 0 15.125 14h-4.042zM14 28C6.268 28 0 21.732 0 14S6.268 0 14 0s14 6.268 14 14-6.268 14-14 14zm0-1.167c7.088 0 12.833-5.745 12.833-12.833S21.088 1.167 14 1.167 1.167 6.912 1.167 14 6.912 26.833 14 26.833z"></path></svg>;
    }
};
