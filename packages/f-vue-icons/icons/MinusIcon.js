import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'MinusIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 14 2"
      },
      "class": "c-ficon c-ficon--minus"
    }, ctx.data]), [h("defs", [h("path", {
      attrs: {
        id: "minus-a",
        d: "M18 11a1 1 0 010 2H6a1 1 0 010-2h12z"
      }
    })]), h("use", {
      attrs: {
        "fill-rule": "evenodd",
        transform: "translate(-5 -11)",
        href: "#minus-a"
      }
    })]);
  }
};