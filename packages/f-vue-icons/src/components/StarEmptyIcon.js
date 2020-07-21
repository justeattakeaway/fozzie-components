export default {
    name: 'StarEmptyIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 17" class="c-ficon c-ficon--star-empty" {...ctx.data}><path d="M9 1.85L6.93 6.04a.42.42 0 0 1-.32.22l-4.63.67 3.35 3.26c.1.1.15.23.12.37l-.79 4.6 4.15-2.18a.42.42 0 0 1 .38 0l4.15 2.17-.8-4.6a.42.42 0 0 1 .13-.36l3.35-3.25-4.63-.68a.42.42 0 0 1-.32-.22L9 1.85zM6.28 5.47L8.63.73a.42.42 0 0 1 .74 0l2.35 4.74 5.26.76c.34.05.47.47.23.71l-3.8 3.7.9 5.2c.05.34-.3.6-.61.44L9 13.82l-4.7 2.46a.42.42 0 0 1-.6-.44l.9-5.2-3.8-3.7a.42.42 0 0 1 .22-.7l5.26-.77z" fill="#CACACA"></path></svg>;
    }
};
