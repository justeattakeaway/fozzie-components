export default {
    name: 'ReviewIcon',

    props: {
        isWhite: {
            type: Boolean,
            default: false
        },

        isBlue: {
            type: Boolean,
            default: false
        },

        isGreen: {
            type: Boolean,
            default: false
        },

        isOrange: {
            type: Boolean,
            default: false
        },

        pushLeft: {
            type: Boolean,
            default: false
        }
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;
        ctx.data.class = {
            'c-ficon--white': ctx.props.isWhite,
            'c-ficon--blue': ctx.props.isBlue,
            'c-ficon--green': ctx.props.isGreen,
            'c-ficon--orange': ctx.props.isOrange,
            'c-ficon--pushLeft': ctx.props.pushLeft
        };

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="c-ficon c-ficon--review" {...ctx.data}><path fill="#333" d="M7.432 6.16a.333.333 0 0 1-.25.183l-1.27.185.919.895a.333.333 0 0 1 .096.295L6.71 8.982l1.135-.597a.333.333 0 0 1 .31 0l1.135.597-.217-1.264a.333.333 0 0 1 .096-.295l.919-.895-1.27-.185a.333.333 0 0 1-.25-.182L8 5.01l-.568 1.15zm.27-2.05a.333.333 0 0 1 .597 0l.789 1.599 1.764.256c.273.04.382.376.185.57L9.76 7.777l.301 1.757a.333.333 0 0 1-.484.351L8 9.056l-1.577.83a.333.333 0 0 1-.484-.351l.3-1.757-1.276-1.244a.333.333 0 0 1 .185-.569l1.764-.256.79-1.599zm-4.23 7.953a3.853 3.853 0 0 1 2.195-.73H13a.333.333 0 0 0 .333-.333V3A.333.333 0 0 0 13 2.667H3A.333.333 0 0 0 2.667 3v9.867c.225-.303.496-.574.804-.804zM13 2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H5.672a3.179 3.179 0 0 0-1.806.6 3.235 3.235 0 0 0-1.21 1.814c-.094.382-.656.313-.656-.08V3a1 1 0 0 1 1-1h10z"></path></svg>;
    }
};
