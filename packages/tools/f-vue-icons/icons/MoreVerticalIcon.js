import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'MoreVerticalIcon',
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
      "class": "c-ficon c-ficon--more-vertical"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M12 8a2 2 0 100-4 2 2 0 000 4zm0 2a2 2 0 100 4 2 2 0 000-4zm0 6a2 2 0 100 4 2 2 0 000-4z",
        fill: "#000",
        "fill-rule": "evenodd"
      }
    })]);
  }
};