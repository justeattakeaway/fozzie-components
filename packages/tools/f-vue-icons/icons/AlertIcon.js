import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'AlertIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 20 20"
      },
      "class": "c-ficon c-ficon--alert"
    }, ctx.data]), [h("path", {
      attrs: {
        "fill-rule": "evenodd",
        d: "M10 0a10 10 0 0110 10A10 10 0 1110 0zm0 16.3a1.5 1.5 0 100-2.9 1.5 1.5 0 000 3zm.3-4.3c.6-3 1.7-4.2 1.7-5.8C12 5 11.2 4 10 4S8 5 8 6.2C8 7.8 9 9 9.7 12h.6z"
      }
    })]);
  }
};