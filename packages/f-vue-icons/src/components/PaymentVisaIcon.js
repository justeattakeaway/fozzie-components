export default {
    name: 'PaymentVisaIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 60" class="c-ficon c-ficon--payment-visa" {...ctx.data}><g fill="none" fill-rule="evenodd"><rect fill="#26337A" width="100" height="60" rx="4"></rect><path fill="#FFF" d="M41.49 39.547l3.075-19.074h4.915l-3.075 19.074H41.49M64.233 20.94c-.972-.382-2.5-.8-4.404-.8-4.86 0-8.28 2.59-8.31 6.295-.03 2.742 2.442 4.27 4.305 5.182 1.915.935 2.56 1.532 2.55 2.368-.012 1.277-1.528 1.862-2.94 1.862-1.968 0-3.014-.288-4.63-1l-.632-.304-.688 4.27c1.146.53 3.27.992 5.476 1.017 5.165 0 8.52-2.558 8.56-6.516.018-2.174-1.292-3.822-4.128-5.182-1.718-.885-2.772-1.47-2.76-2.366 0-.792.89-1.64 2.816-1.64a8.605 8.605 0 0 1 3.678.732l.44.218.667-4.135m6.544 11.843c.408-1.096 1.958-5.33 1.958-5.33-.028.05.405-1.106.653-1.82l.332 1.644s.943 4.553 1.138 5.506h-4.08zm6.064-12.292h-3.798c-1.178 0-2.06.338-2.576 1.58l-7.3 17.482h5.164s.842-2.352 1.033-2.868c.563 0 5.58.01 6.295.01.147.665.6 2.858.6 2.858h4.56L76.84 20.492zm-39.474-.002l-4.81 13.003-.516-2.644c-.896-3.046-3.686-6.347-6.807-8.002l4.4 16.682 5.202-.003 7.74-19.038h-5.208"></path><path d="M28.09 20.476h-7.925l-.065.395c6.167 1.58 10.247 5.395 11.94 9.98l-1.72-8.765c-.3-1.21-1.162-1.567-2.23-1.61" fill="#ED982D"></path></g></svg>;
    }
};
