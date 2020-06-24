export default {
    name: 'TickIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 17 12" class="c-ficon c-ficon--tick" {...ctx.data}><path d="M5.53 10.57L15.65.45a.4.4 0 1 1 .57.57l-10.4 10.4a.4.4 0 0 1-.57 0l-4.8-4.8a.4.4 0 1 1 .57-.57l4.51 4.52z"></path></svg>;
    }
};
