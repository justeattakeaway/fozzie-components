export default {
    name: 'WarningIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 18" class="c-ficon c-ficon--warning" {...ctx.data}><path fill-rule="evenodd" d="M19.8 15.3c.6 1-.2 2.5-1.5 2.5H1.7c-1.3 0-2.1-1.4-1.5-2.5L8.6.8a1.7 1.7 0 012.8 0l8.4 14.5zm-9.8-3a1.6 1.6 0 100 3.2 1.6 1.6 0 000-3.2zM8.5 6.5l.2 4.8a.4.4 0 00.5.4h1.6a.4.4 0 00.5-.4l.2-4.8a.4.4 0 00-.4-.4H8.9c-.2 0-.4.2-.4.5z"></path></svg>;
    }
};
