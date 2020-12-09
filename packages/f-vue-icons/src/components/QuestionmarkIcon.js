export default {
    name: 'QuestionMarkIcon',

    props: {
    },

    functional: true,

    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;

        return <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" class="c-ficon c-ficon--question-mark" {...ctx.data}><path d="M11.667 11.667H10.5a3.506 3.506 0 0 1 4.428-3.38 3.464 3.464 0 0 1 2.451 2.449 3.509 3.509 0 0 1-2.172 4.217.95.95 0 0 0-.624.89v.49h-1.166v-.49c0-.888.556-1.681 1.388-1.985a2.342 2.342 0 0 0 1.448-2.818 2.3 2.3 0 0 0-1.63-1.627 2.34 2.34 0 0 0-2.956 2.254zM14 19.833a1.167 1.167 0 1 1 0-2.333 1.167 1.167 0 0 1 0 2.333zm0 4.667C8.201 24.5 3.5 19.799 3.5 14S8.201 3.5 14 3.5 24.5 8.201 24.5 14 19.799 24.5 14 24.5zm0-1.167a9.333 9.333 0 1 0 0-18.666 9.333 9.333 0 0 0 0 18.666z"></path></svg>;
    }
};
