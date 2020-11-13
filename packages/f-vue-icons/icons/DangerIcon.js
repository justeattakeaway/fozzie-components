import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'DangerIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24"
      },
      "class": "c-ficon c-ficon--danger"
    }, ctx.data]), [h("g", {
      attrs: {
        fill: "none",
        "fill-rule": "evenodd",
        transform: "translate(-2 -2)"
      }
    }, [h("path", {
      attrs: {
        fill: "#D50525",
        d: "M14 2.333A11.667 11.667 0 0125.667 14c0 6.443-5.224 11.667-11.667 11.667S2.333 20.443 2.333 14 7.557 2.333 14 2.333zm-.026 19.074a1.703 1.703 0 100-3.407 1.703 1.703 0 000 3.407zm.366-5.069c.756-3.558 1.942-4.873 1.942-6.793C16.282 8.23 15.423 7 13.974 7c-1.449 0-2.307 1.23-2.307 2.545 0 1.92 1.164 3.235 1.94 6.793h.733z"
      }
    })])]);
  }
};