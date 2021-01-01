import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'SpicyIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 16 20"
      },
      "class": "c-ficon c-ficon--spicy"
    }, ctx.data]), [h("defs", [h("path", {
      attrs: {
        id: "spicy-a",
        d: "M18.3 6.7c-.6-.6-1.3-1-2-1.2-.1-1.8-1.2-3.2-2.9-3.5a1 1 0 10-.3 2c.9.1 1 .9 1.1 1.4a4.2 4.2 0 00-3.5 4.5v1.4c0 1.7-1 3.3-2.8 4.8a14.8 14.8 0 01-3 2c-.4.1-.7.5-.9 1 0 .5 0 1 .4 1.3.8 1 2 1.6 3.6 1.6.9 0 1.9-.2 3-.6 4.1-1.5 8.5-5.8 8.5-10.4v-1c0-1.4-.4-2.5-1.2-3.3"
      }
    })]), h("use", {
      attrs: {
        "fill-rule": "evenodd",
        transform: "translate(-4 -2)",
        href: "#spicy-a"
      }
    })]);
  }
};