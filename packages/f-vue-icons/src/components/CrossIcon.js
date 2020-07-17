export default {
    name: 'CrossIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9 9" class="c-ficon c-ficon--cross" {...ctx.data}><path d="M4.33 4.74L.83 8.25a.29.29 0 0 1-.41-.4l3.5-3.52L.43.83a.29.29 0 1 1 .4-.41l3.51 3.5L7.85.43a.29.29 0 0 1 .4.4l-3.51 3.5 3.51 3.52a.29.29 0 0 1-.4.4L4.33 4.74z"></path></svg>;
    }
};
