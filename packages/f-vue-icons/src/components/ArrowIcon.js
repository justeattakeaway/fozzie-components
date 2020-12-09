export default {
    name: 'ArrowIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" class="c-ficon c-ficon--arrow" {...ctx.data}><path d="M21.342 14l-4.838-4.838a.583.583 0 0 1 .825-.824l5.833 5.833a.583.583 0 0 1 0 .825l-5.833 5.833a.583.583 0 1 1-.825-.825l4.838-4.837H5.25a.583.583 0 0 1 0-1.167h16.092z"></path></svg>;
    }
};
