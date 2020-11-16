export default {
    name: 'WarningIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 22" class="c-ficon c-ficon--warning" {...ctx.data}><g fill="none" fill-rule="evenodd" transform="translate(-2 -3)"><path fill="#FFB727" d="M25.404 21.325c.748 1.296-.19 2.916-1.684 2.916H4.28c-1.496 0-2.43-1.623-1.684-2.916l9.72-16.853c.748-1.297 2.622-1.295 3.368 0l9.72 16.853zM14 17.84a1.863 1.863 0 100 3.727 1.863 1.863 0 000-3.727zm-1.77-6.698l.301 5.51c.014.257.228.46.486.46h1.966a.486.486 0 00.486-.46l.3-5.51a.486.486 0 00-.485-.512h-2.568c-.279 0-.5.234-.485.512z"></path></g></svg>;
    }
};
