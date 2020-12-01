export default {
    name: 'GeoOutlineIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" class="c-ficon c-ficon--geo-outline" {...ctx.data}><path d="M.713 8.903c-.122-.153-.275-.337-.275-.52-.061-.398.184-.796.52-.918L16.348.489a.86.86 0 01.95.214.86.86 0 01.213.948l-6.915 15.39c-.122.337-.52.582-.918.521a.951.951 0 01-.795-.704l-1.224-6.456-6.456-1.224c-.184-.091-.367-.153-.49-.275zm8.66-.214l.703 5.324 5.14-11.168L3.499 7.863l5.874.826z"></path></svg>;
    }
};
