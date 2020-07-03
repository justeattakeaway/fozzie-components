export default {
    name: 'RaysWhiteWideIcon',

    props: {
        classModifier: {
            type: String,
            default: ''
        }
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;
        ctx.data.class = {
            [`c-ficon--${ctx.props.classModifier}`]: ctx.props.classModifier !== ''
        };

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 48" class="c-ficon c-ficon--rays-white-wide" {...ctx.data}><g fill="none" fill-rule="evenodd"><path fill="#FFF" d="M0 0l1280 48H0z" opacity=".3"></path><path fill="#FFF" d="M0 16l1280 32H0z" opacity=".6"></path><path fill="#F5F5F5" d="M0 32l1280 16H0z"></path></g></svg>;
    }
};
