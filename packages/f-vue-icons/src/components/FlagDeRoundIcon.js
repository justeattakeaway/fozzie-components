export default {
    name: 'FlagDeRoundIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-ficon c-ficon--flag.de.round" {...ctx.data}><path d="m16 345a256 256 0 0 0 480 0l-240-22.2z" fill="#ffda44"></path><path d="m256 0a256 256 0 0 0 -240 167l240 22.2 240-22.2a256 256 0 0 0 -240-167z" fill="#333"></path><path d="m16 167a255.5 255.5 0 0 0 0 178h480a255.4 255.4 0 0 0 0-178z" fill="#d80027"></path></svg>;
    }
};
