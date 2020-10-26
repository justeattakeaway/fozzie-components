export default {
    name: 'PlusThickIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" class="c-ficon c-ficon--plus-thick" {...ctx.data}><path fill-rule="evenodd" d="M8.238 13.73H5.815V8.24H.27V5.815h5.545V.27h2.423v5.545h5.547v2.423H8.238v5.493z"></path></svg>;
    }
};
