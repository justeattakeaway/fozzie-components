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
        viewBox: "0 0 16 16"
      },
      "class": "c-ficon c-ficon--alert"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#D50525",
        d: "M7.7 5a.3.3 0 1 1 .6 0v3.3a.3.3 0 1 1-.6 0V5zm.3 5.7a.7.7 0 1 1 0-1.4.7.7 0 0 1 0 1.4zm-5-8a.3.3 0 0 0-.3.3v10c0 .2.1.3.3.3h10a.3.3 0 0 0 .3-.3V3a.3.3 0 0 0-.3-.3H3zM3 2h10a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1z"
      }
    })]);
  }
};