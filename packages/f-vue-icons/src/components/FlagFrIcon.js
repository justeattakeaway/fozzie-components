export default {
    name: 'FlagFrIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="c-ficon c-ficon--flag.fr" {...ctx.data}><g fill-rule="evenodd" stroke-width="1pt"><path fill="#fff" d="M0 0h640v480H0z"></path><path fill="#00267f" d="M0 0h213.337v480H0z"></path><path fill="#f31830" d="M426.662 0H640v480H426.662z"></path></g></svg>;
    }
};
