export default {
    name: 'BinIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 18" class="c-ficon c-ficon--bin" {...ctx.data}><defs><path id="trash-a" d="M6 19c0 1.1.9 2 2 2h8a2 2 0 002-2V7H6v12zm3.8-8.8c.2 0 .5 0 .7.3L12 12l1.5-1.5a1 1 0 011.3-.1h.1a1 1 0 010 1.5l-1.5 1.5 1.5 1.5a1 1 0 01.1 1.3v.1a1 1 0 01-1.5 0L12 14.8l-1.5 1.5a1 1 0 01-1.3.1H9a1 1 0 010-1.5l1.5-1.5L9 11.9a1 1 0 01-.1-1.3v-.1c.2-.2.5-.3.8-.3zM14.5 3l1 1H19v2H5V4h3.5l1-1h5z"></path></defs><use fill-rule="evenodd" transform="translate(-5 -3)" href="#trash-a"></use></svg>;
    }
};
