export default {
    name: 'FlagNoIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="c-ficon c-ficon--flag.no" {...ctx.data}><path fill="#ef2b2d" d="M0 0h640v480H0z"></path><path fill="#fff" d="M180 0h120v480H180z"></path><path fill="#fff" d="M0 180h640v120H0z"></path><path fill="#002868" d="M210 0h60v480h-60z"></path><path fill="#002868" d="M0 210h640v60H0z"></path></svg>;
    }
};
