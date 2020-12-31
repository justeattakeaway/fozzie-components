export default {
    name: 'StarFilledIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" class="c-ficon c-ficon--star-filled" {...ctx.data}><defs><path id="star-filled-a" d="M12 17.3l4.8 2.8a.7.7 0 001-.7L16.5 14l4.3-3.7a.7.7 0 00-.4-1.2l-5.6-.5-2.2-5.1a.7.7 0 00-1.2 0L9.2 8.6l-5.6.5a.7.7 0 00-.4 1.2L7.5 14l-1.3 5.4a.7.7 0 001 .7l4.8-2.8z"></path></defs><use fill="#FF8000" fill-rule="evenodd" transform="translate(-3 -3)" href="#star-filled-a"></use></svg>;
    }
};
