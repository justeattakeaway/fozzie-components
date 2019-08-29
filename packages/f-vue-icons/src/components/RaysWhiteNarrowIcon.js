export default {
    name: 'RaysWhiteNarrowIcon',

    props: {
    },

    functional: true,

    render(h, ctx) {
        const attrs = ctx.data.attrs || {}
        ctx.data.attrs = attrs

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 36" class="ficon ficon-rays-white-narrow" {...ctx.data}><g fill="none"><g opacity=".3"><path fill="#000" d="M0 0l320 36H0z"></path><path fill="#FFF" d="M0 0l320 36H0z"></path></g><path fill="#FFF" d="M0 12l320 24H0z" opacity=".6"></path><path fill="#FFF" d="M0 24l320 12H0z"></path></g></svg>
    }
}