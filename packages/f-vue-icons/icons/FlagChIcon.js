import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagChIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 480"
      },
      "class": "c-ficon c-ficon--flag.ch"
    }, ctx.data]), [h("g", {
      attrs: {
        "fill-rule": "evenodd",
        "stroke-width": "1pt"
      }
    }, [h("path", {
      attrs: {
        fill: "#d52b1e",
        d: "M0 0h640v480H0z"
      }
    }), h("g", {
      attrs: {
        fill: "#fff"
      }
    }, [h("path", {
      attrs: {
        d: "M170 194.997h299.996v89.997H170z"
      }
    }), h("path", {
      attrs: {
        d: "M275 89.997h89.996v299.996H275z"
      }
    })])])]);
  }
};