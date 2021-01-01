import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'CaretIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 12 7"
      },
      "class": "c-ficon c-ficon--caret"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M6.85 13.354l4.784-4.784a.518.518 0 01.732 0l4.784 4.784a.622.622 0 01-.44 1.063H7.29a.622.622 0 01-.44-1.063z",
        fill: "#000",
        transform: "translate(-6 -8)"
      }
    })]);
  }
};