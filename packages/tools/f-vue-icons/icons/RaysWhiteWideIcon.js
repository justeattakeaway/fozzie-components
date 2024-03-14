import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'RaysWhiteWideIcon',
  props: {},
  functional: true,
  render(h, ctx) {
    const attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      "attrs": {
        "xmlns": "http://www.w3.org/2000/svg",
        "viewBox": "0 0 1280 48"
      },
      "class": "c-ficon c-ficon--rays-white-wide"
    }, ctx.data]), [h("g", {
      "attrs": {
        "fill": "none",
        "fill-rule": "evenodd"
      }
    }, [h("path", {
      "attrs": {
        "fill": "#FFF",
        "d": "M0 0l1280 48H0z",
        "opacity": ".3"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FFF",
        "d": "M0 16l1280 32H0z",
        "opacity": ".6"
      }
    }), h("path", {
      "attrs": {
        "fill": "#F5F5F5",
        "d": "M0 32l1280 16H0z"
      }
    })])]);
  }
};