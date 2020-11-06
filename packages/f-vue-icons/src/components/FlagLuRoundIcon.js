export default {
    name: 'FlagLuRoundIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-ficon c-ficon--flag.lu.round" {...ctx.data}><circle cx="256" cy="256" r="256" fill="#eee"></circle><path fill="#d80027" d="M256 0A256 256 0 0 0 16 167h480A256 256 0 0 0 256 0z"></path><path fill="#338af3" d="M256 512a256 256 0 0 0 240-167H16a256 256 0 0 0 240 167z"></path></svg>;
    }
};
