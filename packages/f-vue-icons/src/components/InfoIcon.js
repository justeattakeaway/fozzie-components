export default {
    name: 'InfoIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 22" class="c-ficon c-ficon--info" {...ctx.data}><g fill-rule="evenodd"><path d="M11.58 15.25a.58.58 0 0 1-1.16 0V9.42a.58.58 0 0 1 1.16 0v5.83z"></path><circle transform="rotate(-180 11 6.5)" cx="11" cy="6.5" r="1.17"></circle><path d="M11 21.5a10.5 10.5 0 1 1 0-21 10.5 10.5 0 0 1 0 21zm0-1.17a9.33 9.33 0 1 0 0-18.66 9.33 9.33 0 0 0 0 18.66z"></path></g></svg>;
    }
};
