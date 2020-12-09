export default {
    name: 'MinusIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 2" class="c-ficon c-ficon--minus" {...ctx.data}><defs><path id="minus-a" d="M18 11a1 1 0 010 2H6a1 1 0 010-2h12z"></path></defs><use fill-rule="evenodd" transform="translate(-5 -11)" href="#minus-a"></use></svg>;
    }
};
