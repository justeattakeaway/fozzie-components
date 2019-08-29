import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'PlusThinIcon',
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
      "class": "ficon ficon-plus-thin"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M11.25 10.08h8.83a.59.59 0 1 1 0 1.17h-8.83v8.83a.59.59 0 0 1-1.17 0v-8.83H1.25a.59.59 0 0 1 0-1.17h8.83V1.25a.59.59 0 1 1 1.17 0v8.83z"
      }
    })]);
  }
};