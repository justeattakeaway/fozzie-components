export default {
    name: 'EyeglassIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="c-ficon c-ficon--eyeglass" {...ctx.data}><path d="M15.88 15.28a.42.42 0 1 1-.6.6L10.2 10.8a.42.42 0 1 1 .6-.6l5.08 5.08zm-9.56-2.65A6.32 6.32 0 1 1 6.32 0a6.32 6.32 0 0 1 0 12.63zm0-.84a5.47 5.47 0 1 0 0-10.95 5.47 5.47 0 0 0 0 10.95z"></path></svg>;
    }
};
