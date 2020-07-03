export default {
    name: 'LoyaltyStampIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" class="c-ficon c-ficon--loyalty-stamp" {...ctx.data}><g fill="none" fill-rule="evenodd"><path d="M12.996 9h1.187v4c-.12 1.203-1.122 2.148-2.373 2.24V21h-1.187v-5.76C9.372 15.148 8.37 14.203 8.25 13V9h1.187v4c0 .486.504.914 1.186 1.07V9h1.187v5.07c.682-.161 1.186-.584 1.186-1.07V9zm6.526 0c-1.793.173-3.113 1.698-2.966 3.429-.089 1.507.884 2.885 2.373 3.358V21h1.187v-5.213c1.488-.473 2.462-1.85 2.373-3.358.147-1.731-1.173-3.256-2.967-3.429zm0 5.714c-.98 0-1.78-1.028-1.78-2.285 0-1.258.8-2.286 1.78-2.286.982 0 1.78 1.028 1.78 2.286 0 1.257-.798 2.285-1.78 2.285z" fill="#535353"></path><circle stroke="#535353" cx="15" cy="15" r="14.5"></circle></g></svg>;
    }
};
