export default {
    name: 'CrossIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" class="c-ficon c-ficon--cross" {...ctx.data}><path fill-rule="evenodd" d="M13.3.7a1 1 0 00-1.4 0L7 5.6 2.1.7A1 1 0 10.7 2.1L5.6 7 .7 11.9a1 1 0 101.4 1.4L7 8.4l4.9 4.9a1 1 0 101.4-1.4L8.4 7l4.9-4.9c.4-.4.4-1 0-1.4z"></path></svg>;
    }
};
