export default {
    name: 'FlagNlRoundIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-ficon c-ficon--flag.nl.round" {...ctx.data}><circle cx="256" cy="256" r="256" fill="#eee"></circle><path fill="#a2001d" d="M256 0A256 256 0 0 0 16 167h480A256 256 0 0 0 256 0z"></path><path fill="#0052b4" d="M256 512a256 256 0 0 0 240-167H16a256 256 0 0 0 240 167z"></path></svg>;
    }
};
