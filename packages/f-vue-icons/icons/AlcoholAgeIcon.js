import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'AlcoholAgeIcon',
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
      "class": "c-ficon c-ficon--alcoholAge"
    }, ctx.data]), [h("defs"), h("rect", {
      attrs: {
        rx: "2",
        fill: "#d50525"
      }
    }), h("path", {
      "class": "cls-2",
      attrs: {
        d: "M7.82 14.58H6.46V6.92L4.29 8.25V6.78l2.28-1.36h1.25zM15.71 12.14a2.24 2.24 0 01-.89 1.86 3.57 3.57 0 01-2.27.7 3.46 3.46 0 01-2.21-.7 2.2 2.2 0 01-.87-1.82A2.21 2.21 0 0111 10a2.34 2.34 0 01-1-.82 2.09 2.09 0 01-.37-1.24A2.35 2.35 0 0110.48 6a3.13 3.13 0 012.07-.7 3.24 3.24 0 012.11.7 2.34 2.34 0 01.85 2 2.11 2.11 0 01-1.37 2 2.11 2.11 0 011.57 2.14zm-4.84 0a1.26 1.26 0 00.43 1 1.83 1.83 0 001.26.39 1.86 1.86 0 001.31-.42 1.38 1.38 0 00.46-1 1.35 1.35 0 00-.45-1 1.87 1.87 0 00-1.32-.42 1.76 1.76 0 00-1.27.45 1.53 1.53 0 00-.42 1.02zM11 7.91A1.36 1.36 0 0011.46 9a1.72 1.72 0 001.14.37A1.61 1.61 0 0013.69 9a1.41 1.41 0 00.43-1.09 1.41 1.41 0 00-.39-1 1.56 1.56 0 00-1.18-.41 1.48 1.48 0 00-1.12.42 1.42 1.42 0 00-.43.99z"
      }
    })]);
  }
};