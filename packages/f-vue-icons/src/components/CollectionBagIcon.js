export default {
    name: 'CollectionBagIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="c-ficon c-ficon--collection-bag" {...ctx.data}><path d="M8.305 6.667L8.15 8.81a.417.417 0 1 1-.83-.059L7.5 6.22a.417.417 0 0 1 .416-.387h9.166c.219 0 .4.17.416.387l.77 10.775a1.25 1.25 0 0 1-1.25 1.338H8.75a.417.417 0 1 1 0-.833h8.27a.417.417 0 0 0 .417-.446l-.742-10.387h-8.39zm5.862-.834V4.167a1.667 1.667 0 0 0-3.334 0v1.666h3.334zM5.833 10H8.75a.417.417 0 1 1 0 .833h-.466l-.902 7.136a.417.417 0 0 1-.414.364H3.865a.417.417 0 0 1-.413-.364l-.903-7.136h-.466a.417.417 0 1 1 0-.833H5V8.09L3.455 6.544a.417.417 0 0 1 .59-.59L5.71 7.622a.417.417 0 0 1 .122.295V10zm1.611.833H3.389l.843 6.667h2.369l.843-6.667zM12.5 1.667a2.5 2.5 0 0 1 2.5 2.5V6.25c0 .23-.187.417-.417.417h-4.166A.417.417 0 0 1 10 6.25V4.167a2.5 2.5 0 0 1 2.5-2.5z"></path></svg>;
    }
};
