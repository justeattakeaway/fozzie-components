import _mergeJSXProps from '@vue/babel-helper-vue-jsx-merge-props';

export default {
    name: 'ProfileIcon',
    props: {},
    functional: true,
    render (h, ctx) {
        const attrs = ctx.data.attrs || {};
        ctx.data.attrs = attrs;
        return h('svg', _mergeJSXProps([{
            attrs: {
                xmlns: 'http://www.w3.org/2000/svg',
                viewBox: '0 0 24 24'
            },
            class: 'c-ficon c-ficon--profile'
        }, ctx.data]), [h('path', {
            attrs: {
                d: 'M12 1.958c5.523 0 10 4.477 10 10s-4.477 10-10 10-10-4.477-10-10 4.477-10 10-10zm.286 10.968l-.356.013a9.579 9.579 0 00-4.618 1.006 2.783 2.783 0 00-1.091 1.333 6.66 6.66 0 0011.551.009l-.086-.195a2.806 2.806 0 00-.967-1.105 9.141 9.141 0 00-4.789-1.048zM12 5.7a3 3 0 100 6 3 3 0 000-6z',
                fill: '#000',
                'fill-rule': 'evenodd'
            }
        })]);
    }
};
