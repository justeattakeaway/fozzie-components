export default {
    name: 'FlagNzIcon',

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

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="c-ficon c-ficon--flag.nz" {...ctx.data}><path d="M0-.33v.5l1-.5z"></path><path d="M.19.263L-.104-.14.999-.324z"></path><use transform="scale(-1 1)" href="#a"></use><use transform="rotate(72 0 0)" href="#a"></use><use transform="rotate(-72 0 0)" href="#a"></use><use transform="scale(-1 1) rotate(72)" href="#a"></use><clipPath id="a"><path d="M0 0h600v300H0z"></path></clipPath><clipPath id="b"><path d="M0 0l300 150H0zm300 0h300L300 150zm0 150h300v150zm0 0v150H0z"></path></clipPath><path d="M0 0h640v480H0z" fill="#00247d" fill-rule="evenodd"></path><g transform="translate(-92.95 36.12) scale(.66825)"><use fill="#fff" height="100%" width="100%" href="#b" transform="matrix(45.4 0 0 45.4 900 120)"></use><use fill="#cc142b" height="100%" width="100%" href="#b" transform="matrix(30 0 0 30 900 120)"></use></g><g transform="rotate(82 534.18 124.98) scale(.66825)"><use fill="#fff" height="100%" width="100%" href="#b" transform="rotate(-82 519.02 -457.67) scale(40.4)"></use><use fill="#cc142b" height="100%" width="100%" href="#b" transform="rotate(-82 519.02 -457.67) scale(25)"></use></g><g transform="rotate(82 534.18 124.98) scale(.66825)"><use fill="#fff" height="100%" width="100%" href="#b" transform="rotate(-82 668.57 -327.67) scale(45.4)"></use><use fill="#cc142b" height="100%" width="100%" href="#b" transform="rotate(-82 668.57 -327.67) scale(30)"></use></g><g transform="translate(-92.95 36.12) scale(.66825)"><use fill="#fff" height="100%" width="100%" href="#b" transform="matrix(50.4 0 0 50.4 900 480)"></use><use fill="#cc142b" height="100%" width="100%" href="#b" transform="matrix(35 0 0 35 900 480)"></use></g><path clip-path="url(#a)" d="M0 0l600 300M0 300L600 0" transform="scale(.60681 .73139)" stroke="#fff" stroke-width="60"></path><path clip-path="url(#b)" d="M0 0l600 300M0 300L600 0" transform="scale(.60681 .73139)" stroke="#cc142b" stroke-width="40"></path><path style="line-height:normaltext-indent:0text-align:starttext-decoration-line:nonetext-decoration-style:solidtext-decoration-color:#000text-transform:noneblock-progression:tbisolation:automix-blend-mode:normal" clip-path="url(#a)" d="M151.7 0v79.37H0v60.68h151.7v79.37h60.69v-79.37h151.7V79.37H212.4V0z" color="#000" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible" fill="#fff"></path><path style="line-height:normaltext-indent:0text-align:starttext-decoration-line:nonetext-decoration-style:solidtext-decoration-color:#000text-transform:noneblock-progression:tbisolation:automix-blend-mode:normal" d="M163.84 0v91.5H0v36.41h163.84v91.5h36.41v-91.5H364.1v-36.4H200.25V0z" color="#000" font-weight="400" font-family="sans-serif" white-space="normal" overflow="visible" fill="#cc142b"></path></svg>;
    }
};
