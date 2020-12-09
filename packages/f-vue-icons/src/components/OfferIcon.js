export default {
    name: 'OfferIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="c-ficon c-ficon--offer" {...ctx.data}><path fill-rule="evenodd" d="M19.41 9.58l-9-9C10.05.22 9.55 0 9 0H2C.9 0 0 .9 0 2v7c0 .55.22 1.05.59 1.42l9 9c.36.36.86.58 1.41.58.55 0 1.05-.22 1.41-.59l7-7c.37-.36.59-.86.59-1.41 0-.55-.23-1.06-.59-1.42zM3.5 5C2.67 5 2 4.33 2 3.5S2.67 2 3.5 2 5 2.67 5 3.5 4.33 5 3.5 5z"></path></svg>;
    }
};
