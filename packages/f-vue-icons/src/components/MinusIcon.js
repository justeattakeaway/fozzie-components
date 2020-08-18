export default {
    name: 'MinusIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 1" class="c-ficon c-ficon--minus" {...ctx.data}><path d="M.33 1a.33.33 0 0 1 0-.67h11.34a.33.33 0 0 1 0 .67H.33z" fill="#333"></path></svg>;
    }
};
