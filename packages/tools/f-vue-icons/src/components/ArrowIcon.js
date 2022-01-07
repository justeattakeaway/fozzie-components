export default {
    name: 'ArrowIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="c-ficon c-ficon--arrow" {...ctx.data}><path fill="#000" fill-rule="evenodd" d="M1 6.958h11.17L7.459 2.247A1 1 0 0 1 8.873.833l6.419 6.419a1 1 0 0 1 0 1.415l-6.419 6.419a1 1 0 0 1-1.414-1.414L12.17 8.96H1a1 1 0 0 1 0-2.002Z"></path></svg>;
    }
};
