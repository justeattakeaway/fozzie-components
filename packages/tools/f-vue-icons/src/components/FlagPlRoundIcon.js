export default {
    name: 'FlagPlRoundIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-ficon c-ficon--flag.pl.round" {...ctx.data}><circle cx="256" cy="256" r="256" fill="#eee"></circle><path fill="#d80027" d="M512 256a256 256 0 0 1-512 0"></path></svg>;
    }
};
