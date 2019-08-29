export default {
    name: 'RaysColouredWideIcon',

    props: {
    },

    functional: true,

    render(h, ctx) {
        const attrs = ctx.data.attrs || {}
        ctx.data.attrs = attrs

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1272 215" class="ficon ficon-rays-coloured-wide" {...ctx.data}><g fill="none" fill-rule="evenodd"><path fill="gold" d="M656 135l616-68.81V0z"></path><path fill="#95D600" d="M344 201.896V215h140.55L656 135z"></path><path fill="#00AC41" d="M3 215h341.073L656 135z"></path><path fill="#7DCAEB" d="M968.079 215H1228l-572-80z"></path><path fill="#2F7DE1" d="M627 215h208l-179-80z"></path><path fill="#E2E71F" d="M485 214.996l143.163.004L656 135z"></path><path fill="#2BACE4" d="M829.448 215H970l-314-80z"></path><path fill="#FF5000" d="M1226.308 215H1272v-63.834L656 135z"></path><path fill="#FF9E16" d="M656 135l616 21V66z"></path><path fill="#FF5959" d="M0 155.678V215h8.364L656 135z"></path><path fill="#FA0029" d="M0 1v155l656-21z"></path></g></svg>
    }
}