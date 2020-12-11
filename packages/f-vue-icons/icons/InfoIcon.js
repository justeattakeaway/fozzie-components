import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'InfoIcon',
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
      "class": "c-ficon c-ficon--info"
    }, ctx.data]), [h("defs", [h("path", {
      attrs: {
        id: "info-circle-filled-a",
        d: "M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 9c.6 0 1 .5 1 1v4c0 .6-.5 1-1 1s-1-.5-1-1v-4c0-.6.5-1 1-1zm.5-4a1.3 1.3 0 11-1 2.4 1.3 1.3 0 011-2.5z"
      }
    })]), h("use", {
      attrs: {
        "fill-rule": "evenodd",
        transform: "translate(-2 -2)",
        href: "#info-circle-filled-a"
      }
    })]);
  }
};