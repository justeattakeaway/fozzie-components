export default {
    name: 'FlagBeRoundIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-ficon c-ficon--flag.be.round" {...ctx.data}><path fill="#ffda44" d="M345 16a255.5 255.5 0 0 0-178 0l-22.3 240L167 496a255.4 255.4 0 0 0 178 0l22.3-240L345 16z"></path><path fill="#d80027" d="M512 256A256 256 0 0 0 345 16v480a256 256 0 0 0 167-240z"></path><path fill="#333" d="M0 256a256 256 0 0 0 167 240V16A256 256 0 0 0 0 256z"></path></svg>;
    }
};
