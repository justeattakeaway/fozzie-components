export default {
    name: 'CrossIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="c-ficon c-ficon--cross" {...ctx.data}><path d="m13.801.807-5.8 5.802L2.198.807.808 2.2 6.608 8l-5.8 5.801 1.39 1.392L8 9.39l5.801 5.802 1.392-1.392L9.39 8l5.802-5.801L13.8.807Z" fill="#242E30"></path></svg>;
    }
};
