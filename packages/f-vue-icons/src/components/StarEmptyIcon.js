export default {
    name: 'StarEmptyIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17" class="c-ficon c-ficon--star-empty" {...ctx.data}><path fill="#CACACA" fill-rule="evenodd" d="M16.6 6l-4.8-.4L10 1.2a1 1 0 00-1.8 0L6 5.6 1.5 6a1 1 0 00-.6 1.8L4.5 11l-1.1 4.7a1 1 0 001.4 1L9 14.4l4.1 2.5a1 1 0 001.5-1.1l-1-4.7 3.6-3.2c.7-.6.3-1.7-.6-1.8zM9 12.4l-3.8 2.3 1-4.3L3 7.5l4.4-.4 1.7-4 1.7 4 4.4.4-3.3 2.9 1 4.3L9 12.4z"></path></svg>;
    }
};
