import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'PlusIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 21 21"
      },
      "class": "c-ficon c-ficon--plus"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M11.25 10.08h8.83a.59.59 0 110 1.17h-8.83v8.83a.59.59 0 01-1.17 0v-8.83H1.25a.59.59 0 010-1.17h8.83V1.25a.59.59 0 111.17 0v8.83z"
      }
    })]);
  }
};