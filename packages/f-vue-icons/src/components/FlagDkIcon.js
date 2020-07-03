export default {
    name: 'FlagDkIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="c-ficon c-ficon--flag.dk" {...ctx.data}><path fill="#c60c30" d="M0 0h640.1v480H0z"></path><path fill="#fff" d="M205.714 0h68.57v480h-68.57z"></path><path fill="#fff" d="M0 205.714h640.1v68.57H0z"></path></svg>;
    }
};
