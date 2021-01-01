import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'EyeglassIcon',
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
      "class": "c-ficon c-ficon--eyeglass"
    }, ctx.data]), [h("defs", [h("path", {
      attrs: {
        d: "M19.72 18.28L15.42 14A6.91 6.91 0 1014 15.39l4.29 4.3a1 1 0 001.42 0 1 1 0 00.01-1.41zM4.92 9.82a4.95 4.95 0 114.94 4.94 4.94 4.94 0 01-4.94-4.94z",
        id: "a"
      }
    })]), h("use", {
      attrs: {
        fill: "#fff",
        href: "#a",
        "fill-rule": "evenodd"
      }
    })]);
  }
};