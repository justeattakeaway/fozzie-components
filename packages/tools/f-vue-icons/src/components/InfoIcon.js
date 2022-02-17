export default {
    name: 'InfoIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="c-ficon c-ficon--info" {...ctx.data}><path d="M12 .133A11.867 11.867 0 1 0 23.867 12 11.882 11.882 0 0 0 12 .133ZM10.852 10.76h2.296v5.834h-2.296V10.76Zm2.68-3.354a1.532 1.532 0 1 1-3.064 0 1.532 1.532 0 0 1 3.063 0Z"></path></svg>;
    }
};
