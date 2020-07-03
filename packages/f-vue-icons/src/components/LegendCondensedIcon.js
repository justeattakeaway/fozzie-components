export default {
    name: 'LegendCondensedIcon',

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

        isDarkestGrey: {
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
            'c-ficon--grey--darkest': ctx.props.isDarkestGrey,
            'c-ficon--pushLeft': ctx.props.pushLeft
        };

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 56 32" class="c-ficon c-ficon--legend-condensed" {...ctx.data}><g fill="none" fill-rule="evenodd"><path d="M17.288 21.898h3.924c.43 0 .678.276.678.657 0 .368-.312.632-.691.632h-4.472c-.638 0-.938-.381-.833-1.026l1.25-7.598c.08-.448.3-.671.679-.671.456 0 .743.355.651.868l-1.186 7.138zm9.125-2.748c.131 0 .21-.065.236-.183.22-1.17-.378-1.683-1.33-1.683-1.057 0-1.63.604-1.851 1.866h2.945zm-3.115 1.066l-.04.236c-.156 1.038.495 1.578 1.604 1.578.482 0 .978-.118 1.473-.355a.812.812 0 0 1 .327-.093c.365 0 .599.264.599.618 0 .264-.157.474-.457.645-.573.315-1.225.474-1.967.474-.939 0-1.67-.264-2.205-.79-.533-.538-.755-1.248-.676-2.13.012-.17.103-.696.261-1.59.351-1.84 1.603-2.696 3.102-2.696 1.59 0 2.96.974 2.542 3.024l-.052.237c-.144.566-.457.842-.951.842h-3.56zm6.727-1.236c-.098.442-.168.89-.21 1.34-.116 1.04.418 1.67 1.448 1.67.482 0 .991-.158 1.512-.473l.613-3.746c-.43-.237-.952-.355-1.552-.355-.976 0-1.576.525-1.81 1.564zm3.859 3.892c-.326 2.103-1.434 2.931-3.194 2.931-.875 0-1.76-.355-2.217-.724-.233-.17-.352-.367-.352-.617 0-.315.249-.604.613-.604.13 0 .274.052.444.144.508.369 1.055.552 1.615.552.979 0 1.618-.605 1.787-1.762a3.455 3.455 0 0 1-1.577.382c-.809 0-1.447-.25-1.918-.763-.455-.512-.651-1.196-.586-2.051.04-.5.131-1.039.249-1.63.351-1.734 1.446-2.616 3.115-2.616 1.148 0 2.125.408 2.633.79.221.169.3.367.261.604l-.873 5.364zm6.023-3.722c.13 0 .209-.065.235-.183.22-1.17-.378-1.683-1.33-1.683-1.057 0-1.63.604-1.851 1.866h2.946zm-3.115 1.066l-.04.237c-.156 1.038.495 1.578 1.604 1.578.482 0 .978-.119 1.473-.355a.812.812 0 0 1 .327-.093c.365 0 .599.264.599.618 0 .264-.157.474-.456.645-.574.315-1.226.474-1.968.474-.939 0-1.67-.264-2.204-.79-.534-.538-.756-1.248-.677-2.13.012-.17.103-.696.261-1.59.351-1.84 1.603-2.696 3.102-2.696 1.59 0 2.96.974 2.542 3.024l-.052.237c-.144.566-.457.841-.951.841h-3.56zm10.806 2.379c-.064.434-.287.645-.678.645-.43 0-.703-.343-.638-.829l.56-3.353c.222-1.302-.625-1.604-1.343-1.604a2.99 2.99 0 0 0-1.564.434l-.77 4.72c-.064.42-.298.632-.678.632-.455 0-.716-.355-.651-.843l.834-5.022c.04-.25.17-.433.392-.578a4.856 4.856 0 0 1 2.542-.684c.86 0 1.55.237 2.06.725.507.484.691 1.208.534 2.168l-.6 3.589zm3.143-.999c.274.276.678.42 1.185.42.51 0 .992-.144 1.422-.446l.6-3.681c-.312-.224-.951-.473-1.578-.473-.925 0-1.512.525-1.746 1.564-.078.328-.144.775-.21 1.34-.064.566.053.986.327 1.276zm1.526-5.483a3.93 3.93 0 0 1 1.903.46l.352-2.117c.065-.433.286-.644.665-.644.456 0 .716.355.652.842l-1.227 7.44c-.051.277-.13.382-.392.54a4.06 4.06 0 0 1-2.293.684c-.873 0-1.59-.264-2.138-.802-.547-.54-.782-1.29-.691-2.262.04-.355.118-.854.248-1.525.352-1.696 1.473-2.616 2.92-2.616z" fill="#575756" fill-rule="nonzero"></path><g transform="translate(22.4 12.76)"><mask id="a" fill="#fff"><use></use></mask><polygon fill="#EA5E65" fill-rule="nonzero" mask="url(#a)" points="22.1386667 0.266352941 22.1386667 6.95811765 -5.264 3.504"></polygon></g><g transform="translate(16.8 .524)"><mask id="b" fill="#fff"><use></use></mask><polygon fill="#E20613" fill-rule="nonzero" mask="url(#b)" points="4.14306667 0.138352941 27.7377333 -0.134588235 27.7377333 12.5016471 0.335066667 15.7392941"></polygon></g><g transform="translate(0 8.995)"><mask id="c" fill="#fff"><use></use></mask><polygon fill="#81CFF4" fill-rule="nonzero" mask="url(#c)" points="-9.67866667 8.59105882 -10.2666667 0.191058824 17.136 7.26870588"></polygon></g><g transform="translate(0 .524)"><mask id="d" fill="#fff"><use></use></mask><polyline fill="#F6A500" fill-rule="nonzero" mask="url(#d)" points="15.694 -2.58352941 17.7809333 16.416 -1.456 -3.76"></polyline></g><g transform="translate(0 .524)"><mask id="e" fill="#fff"><use></use></mask><polygon fill="#EB6608" fill-rule="nonzero" mask="url(#e)" points="-10.2666667 8.66164706 0.237066667 -2.99576471 17.136 15.7402353"></polygon></g><g transform="translate(14.933 .524)"><mask id="f" fill="#fff"><use></use></mask><polygon fill="#FFDC00" fill-rule="nonzero" mask="url(#f)" points="0.00186666667 -5.23105882 6.944 -0.134588235 2.20266667 15.7392941"></polygon></g><g transform="translate(4.667 15.583)"><mask id="g" fill="#fff"><use></use></mask><polyline fill="#2580C3" fill-rule="nonzero" mask="url(#g)" points="-12.5953333 13.2225882 12.4693333 0.681411765 1.4616 18.1176471"></polyline></g><g transform="translate(4.667 15.583)"><mask id="h" fill="#fff"><use></use></mask><polygon fill="#1DB4E9" fill-rule="nonzero" mask="url(#h)" points="12.4693333 0.681411765 -12.5944 13.2225882 -13.5277333 1.70541176"></polygon></g><g transform="translate(5.6 15.583)"><mask id="i" fill="#fff"><use></use></mask><polygon fill="#D2D700" fill-rule="nonzero" mask="url(#i)" points="15.9264 18.8235294 0.877333333 17.1764706 11.536 0.681411765"></polygon></g><g transform="translate(11.2 18.407)"><mask id="j" fill="#fff"><use></use></mask><polygon fill="#93C01F" fill-rule="nonzero" mask="url(#j)" points="24.4561333 13.7308235 0.472266667 13.7308235 5.936 -2.14211765"></polygon></g><g transform="translate(16.8 24.054)"><mask id="k" fill="#fff"><use></use></mask><polygon fill="#00A65D" fill-rule="nonzero" mask="url(#k)" points="27.7386667 8.08376471 18.8561333 8.08376471 0.336 -7.78917647 27.7386667 -4.33505882"></polygon></g></g></svg>;
    }
};
