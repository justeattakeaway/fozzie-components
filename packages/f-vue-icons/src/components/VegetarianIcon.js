export default {
    name: 'VegetarianIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" class="c-ficon c-ficon--vegetarian" {...ctx.data}><path d="M14.512.008a.794.794 0 01.664.227c.167.183.24.434.2.68-.016.145-.064.348-.064.575-.28 2.76-1.128 11.147-7.576 12.62a7.224 7.224 0 01-2.104.308 4.758 4.758 0 01-2.79-.778l5.406-6.16-6.182 5.44c-1.493-2.06-.576-5.042-.538-5.173C2.936 1.287 11.216.372 13.936.073zM2.16 15.381L9 6.525"></path><path d="M1.536 14.887L9 6.533l-6.232 9.35a.792.792 0 01-1.112.219.817.817 0 01-.216-1.125.386.386 0 01.096-.09z"></path></svg>;
    }
};
