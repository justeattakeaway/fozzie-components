import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagFrIcon',
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
      "class": "ficon ficon-flag.fr"
    }, ctx.data]), [h("g", {
      attrs: {
        "fill-rule": "evenodd",
        "stroke-width": "1pt"
      }
    }, [h("path", {
      attrs: {
        fill: "#fff",
        d: "M0 0h640v480H0z"
      }
    }), h("path", {
      attrs: {
        fill: "#00267f",
        d: "M0 0h213.337v480H0z"
      }
    }), h("path", {
      attrs: {
        fill: "#f31830",
        d: "M426.662 0H640v480H426.662z"
      }
    })])]);
  }
};