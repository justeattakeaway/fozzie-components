export default {
    name: 'FlagRoRoundIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-ficon c-ficon--flag.ro.round" {...ctx.data}><path fill="#ffda44" d="M256 0c-31.3 0-61.3 5.6-89 16L9 256l158 240a255.4 255.4 0 0 0 89 16c31.3 0 61.3-5.6 89-16l158-240L345 16a255.5 255.5 0 0 0-89-16z"></path><path fill="#d80027" d="M512 256A256 256 0 0 0 345 16v480a256 256 0 0 0 167-240z"></path><path fill="#0052b4" d="M167 496V16a256 256 0 0 0 0 480z"></path></svg>;
    }
};
