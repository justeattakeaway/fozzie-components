export default {
    name: 'FlagNzIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 480" class="c-ficon c-ficon--flag.nz" {...ctx.data}><path d="M0-.33v.5l1-.5z"></path><path d="M.19.263L-.104-.14.999-.324z"></path><use href="#flag-nz-a" transform="scale(-1 1)"></use><use href="#flag-nz-a" transform="rotate(72 0 0)"></use><use href="#flag-nz-a" transform="rotate(-72 0 0)"></use><use href="#flag-nz-a" transform="scale(-1 1) rotate(72)"></use><clipPath id="flag-nz-a"><path d="M0 0h600v300H0z"></path></clipPath><clipPath id="flag-nz-b"><path d="M0 0l300 150H0zm300 0h300L300 150zm0 150h300v150zm0 0v150H0z"></path></clipPath><path fill="#00247d" fill-rule="evenodd" d="M0 0h640v480H0z"></path><g transform="translate(-92.95 36.12) scale(.66825)"><use width="100%" height="100%" fill="#fff" href="#flag-nz-b" transform="matrix(45.4 0 0 45.4 900 120)"></use><use width="100%" height="100%" fill="#cc142b" href="#flag-nz-b" transform="matrix(30 0 0 30 900 120)"></use></g><g transform="rotate(82 534.18 124.98) scale(.66825)"><use width="100%" height="100%" fill="#fff" href="#flag-nz-b" transform="rotate(-82 519.02 -457.67) scale(40.4)"></use><use width="100%" height="100%" fill="#cc142b" href="#flag-nz-b" transform="rotate(-82 519.02 -457.67) scale(25)"></use></g><g transform="rotate(82 534.18 124.98) scale(.66825)"><use width="100%" height="100%" fill="#fff" href="#flag-nz-b" transform="rotate(-82 668.57 -327.67) scale(45.4)"></use><use width="100%" height="100%" fill="#cc142b" href="#flag-nz-b" transform="rotate(-82 668.57 -327.67) scale(30)"></use></g><g transform="translate(-92.95 36.12) scale(.66825)"><use width="100%" height="100%" fill="#fff" href="#flag-nz-b" transform="matrix(50.4 0 0 50.4 900 480)"></use><use width="100%" height="100%" fill="#cc142b" href="#flag-nz-b" transform="matrix(35 0 0 35 900 480)"></use></g><path stroke="#fff" stroke-width="60" d="M0 0l600 300M0 300L600 0" clip-path="url(#flag-nz-a)" transform="scale(.60681 .73139)"></path><path stroke="#cc142b" stroke-width="40" d="M0 0l600 300M0 300L600 0" clip-path="url(#flag-nz-b)" transform="scale(.60681 .73139)"></path><path fill="#fff" d="M151.7 0v79.37H0v60.68h151.7v79.37h60.69v-79.37h151.7V79.37H212.4V0z" clip-path="url(#flag-nz-a)"></path><path fill="#cc142b" d="M163.84 0v91.5H0v36.41h163.84v91.5h36.41v-91.5H364.1v-36.4H200.25V0z"></path></svg>;
    }
};
