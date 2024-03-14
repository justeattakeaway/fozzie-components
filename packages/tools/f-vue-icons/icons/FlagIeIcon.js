import _mergeJSXProps from "@vue/babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagIeIcon',
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
      "class": "c-ficon c-ficon--flag.ie"
    }, ctx.data]), [h("g", {
      "attrs": {
        "fill-rule": "evenodd",
        "stroke-width": "1pt"
      }
    }, [h("path", {
      "attrs": {
        "fill": "#fff",
        "d": "M0 0h639.995v480.004H0z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#009A49",
        "d": "M0 0h213.334v480.004H0z"
      }
    }), h("path", {
      "attrs": {
        "fill": "#FF7900",
        "d": "M426.668 0h213.334v480.004H426.668z"
      }
    })])]);
  }
};