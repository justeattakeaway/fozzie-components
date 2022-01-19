export default {
    name: 'CashSmallIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0.22 0.97 13.56 9.19" class="c-ficon c-ficon--cash-small" {...ctx.data}><path d="M13.781.969H2.844v2.625H.219v6.562h10.937V7.531h2.625V.97ZM9.844 8.844H1.53V4.906h1.313v2.625h7v1.313Zm2.625-2.625H4.156V2.28h8.313V6.22ZM7.219 4.25a1.094 1.094 0 1 1 2.187 0 1.094 1.094 0 0 1-2.187 0Z" fill="#242E30"></path></svg>;
    }
};
