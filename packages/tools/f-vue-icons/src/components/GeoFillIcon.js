export default {
    name: 'GeoFillIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" class="c-ficon c-ficon--geo-fill" {...ctx.data}><path d="M.674 8.873C.582 8.72.429 8.567.429 8.322c0-.398.153-.766.55-.919L16.325.513c.306-.154.705-.093 1.01.152.246.245.307.613.154 1.01L10.505 17.02c-.153.398-.551.551-.919.551-.398-.091-.704-.306-.766-.704l-1.255-6.432L1.133 9.18c-.153-.062-.306-.215-.46-.307z"></path></svg>;
    }
};
