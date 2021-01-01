export default {
    name: 'BasketIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 16" class="c-ficon c-ficon--basket" {...ctx.data}><path fill-rule="evenodd" d="M10 2.7L7.5 6.1H5L9.2.4a1 1 0 011.6 0L15 6.1h4a1 1 0 011 1.3l-2.5 7.7-.2.6a.9.9 0 01-.4.2l-.6.1H3a.9.9 0 01-.4-.3l-.2-.6L0 7.4a1 1 0 011-1.3h11.4L10 2.7z"></path></svg>;
    }
};
