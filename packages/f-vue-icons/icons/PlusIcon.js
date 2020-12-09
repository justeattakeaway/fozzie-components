import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'PlusIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 14 14"
      },
      "class": "c-ficon c-ficon--plus"
    }, ctx.data]), [h("defs", [h("path", {
      attrs: {
        id: "plus-a",
        d: "M12 5c.6 0 1 .4 1 1v5h5c.6 0 1 .4 1 1s-.4 1-1 1h-5v5c0 .6-.4 1-1 1a1 1 0 01-1-1v-5H6a1 1 0 010-2h5V6a1 1 0 011-1z"
      }
    })]), h("use", {
      attrs: {
        "fill-rule": "evenodd",
        transform: "translate(-5 -5)",
        href: "#plus-a"
      }
    })]);
  }
};