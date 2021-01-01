export default {
    name: 'FlagItRoundIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-ficon c-ficon--flag.it.round" {...ctx.data}><circle cx="256" cy="256" r="256" fill="#eee"></circle><path fill="#d80027" d="M512 256A256 256 0 0 0 345 16v480a256 256 0 0 0 167-240z"></path><path fill="#6da544" d="M0 256a256 256 0 0 0 167 240V16A256 256 0 0 0 0 256z"></path></svg>;
    }
};
