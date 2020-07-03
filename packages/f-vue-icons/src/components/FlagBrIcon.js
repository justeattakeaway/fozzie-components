export default {
    name: 'FlagBrIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="c-ficon c-ficon--flag.br" {...ctx.data}><g fill-rule="evenodd" stroke-width="1pt"><path fill="#229e45" d="M0 0h640v480H0z"></path><path fill="#f8e509" d="M321.406 435.935l301.483-195.67-303.31-196.2-302.47 196.67 304.295 195.2z"></path><path fill="#2b49a3" d="M452.77 240.005c0 70.328-57.103 127.34-127.544 127.34-70.442 0-127.544-57.012-127.544-127.34s57.104-127.34 127.544-127.34c70.442 0 127.545 57.012 127.545 127.34z"></path><path fill="#fff" d="M444.368 285.817c1.944-5.083 4.45-12.75 5.783-19.786-67.74-59.506-143.26-89.99-238.68-83.72-3.42 6.56-6.16 13.425-8.47 20.855 113.065-10.786 195.938 39.27 241.37 82.654z"></path></g></svg>;
    }
};
