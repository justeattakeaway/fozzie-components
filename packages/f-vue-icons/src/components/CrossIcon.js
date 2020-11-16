export default {
    name: 'CrossIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14" class="c-ficon c-ficon--cross" {...ctx.data}><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><g transform="translate(-965.000000, -21.000000)"><g transform="translate(952.000000, 8.000000)"><path d="M0,20 C0,8.954305 8.95187636,0 20,0 L20,0 C31.045695,0 40,8.95187636 40,20 L40,20 C40,31.045695 31.0481236,40 20,40 L20,40 C8.954305,40 0,31.0481236 0,20 L0,20 Z"></path><path d="M0,20 C0,8.954305 8.95187636,0 20,0 L20,0 C31.045695,0 40,8.95187636 40,20 L40,20 C40,31.045695 31.0481236,40 20,40 L20,40 C8.954305,40 0,31.0481236 0,20 L0,20 Z"></path><g transform="translate(8.000000, 8.000000)"><polygon opacity="0" points="0 24 24 24 24 0 0 0"></polygon><path d="M18.3,5.71 C17.91,5.32 17.28,5.32 16.89,5.71 L12,10.59 L7.11,5.7 C6.72,5.31 6.09,5.31 5.7,5.7 C5.31,6.09 5.31,6.72 5.7,7.11 L10.59,12 L5.7,16.89 C5.31,17.28 5.31,17.91 5.7,18.3 C6.09,18.69 6.72,18.69 7.11,18.3 L12,13.41 L16.89,18.3 C17.28,18.69 17.91,18.69 18.3,18.3 C18.69,17.91 18.69,17.28 18.3,16.89 L13.41,12 L18.3,7.11 C18.68,6.73 18.68,6.09 18.3,5.71 Z" fill="#2A3846"></path></g></g></g></g></svg>;
    }
};
