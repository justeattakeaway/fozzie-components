export default {
    name: 'FlagChIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="c-ficon c-ficon--flag.ch" {...ctx.data}><g fill-rule="evenodd" stroke-width="1pt"><path fill="#d52b1e" d="M0 0h640v480H0z"></path><g fill="#fff"><path d="M170 194.997h299.996v89.997H170z"></path><path d="M275 89.997h89.996v299.996H275z"></path></g></g></svg>;
    }
};
