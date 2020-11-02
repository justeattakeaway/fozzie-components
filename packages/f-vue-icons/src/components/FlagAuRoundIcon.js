export default {
    name: 'FlagAuRoundIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="c-ficon c-ficon--flag.au.round" {...ctx.data}><path d="m512 256a256 256 0 0 1 -512 0l256-256a256 256 0 0 1 256 256z" fill="#0052b4"></path><g fill="#eee"><path d="m255.3 256h.7v-.7z"></path><path d="m256 133.6v-133.6a256 256 0 0 0 -256 256h133.6v-75.2l75.2 75.2h46.5l.7-.7v-46.5l-75.2-75.2z"></path></g><g fill="#d80027"><path d="m129.5 33.4a257.2 257.2 0 0 0 -96.1 96.1v126.5h66.8v-155.8h155.8v-66.8z"></path><path d="m256 224.5-91-91h-31.4l122.4 122.5z"></path></g><path d="m154.4 300.5 14 29.4 31.8-7.3-14.2 29.3 25.5 20.2-31.8 7.2.1 32.5-25.4-20.3-25.4 20.3v-32.5l-31.6-7.3 25.5-20.2-14.2-29.3 31.7 7.3zm228.9 55.7 7 14.7 15.9-3.7-7.1 14.6 12.7 10.2-15.9 3.5v16.3l-12.6-10.2-12.7 10.2v-16.3l-15.9-3.5 12.8-10.2-7.1-14.6 15.9 3.7zm-65.4-155.9 7 14.7 16-3.6-7.2 14.6 12.8 10.1-16 3.6.1 16.3-12.7-10.2-12.7 10.2v-16.3l-15.8-3.6 12.7-10-7-14.7 15.8 3.6zm65.4-89 7 14.7 15.9-3.7-7.2 14.7 12.7 10-15.9 3.7v16.3l-12.6-10.2-12.7 10.2v-16.3l-15.9-3.6 12.8-10.1-7.1-14.7 15.9 3.7zm57 66.8 7 14.7 16-3.7-7.1 14.7 12.7 10-15.9 3.7v16.2l-12.6-10.1-12.7 10.1v-16.2l-15.9-3.6 12.8-10.1-7.1-14.7 15.8 3.7zm-40.7 77.9 5.6 17h17.8l-14.5 10.5 5.5 17-14.5-10.5-14.4 10.5 5.5-17-14.5-10.5h18z" fill="#eee"></path></svg>;
    }
};
