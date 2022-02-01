export default {
    name: 'ClockSmallIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0.22 0.22 13.56 13.56" class="c-ficon c-ficon--clock-small" {...ctx.data}><path d="M7 13.781A6.782 6.782 0 1 1 13.781 7 6.79 6.79 0 0 1 7 13.781Zm0-12.25A5.469 5.469 0 1 0 7 12.47 5.469 5.469 0 0 0 7 1.53Z" fill="#242E30"></path><path d="m9.284 9.31-2.94-1.759V3.5h1.312v3.308l2.31 1.382-.682 1.12Z" fill="#242E30"></path></svg>;
    }
};
