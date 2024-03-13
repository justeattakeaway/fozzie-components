import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagEsIcon',
  props: {},
  functional: true,
  render(h, ctx) {
    const attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 640 480"
      },
      "class": "c-ficon c-ficon--flag.es"
    }, ctx.data]), [h("path", {
      "attrs": {
        "fill": "#c60b1e",
        "d": "M0 0h640v480H0z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#ffc400",
        "d": "M0 120h640v240H0z"
      }
    })]);
  }
};