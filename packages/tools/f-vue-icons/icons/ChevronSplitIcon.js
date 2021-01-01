import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'ChevronSplitIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 10 18"
      },
      "class": "c-ficon c-ficon--chevron-split"
    }, ctx.data]), [h("path", {
      attrs: {
        "fill-rule": "evenodd",
        d: "M5 2.8l2.5 2.5a1 1 0 101.4-1.4L5.7.7a1 1 0 00-1.4 0L1 3.9a1 1 0 101.4 1.4L5 2.8zm0 12.4l-2.5-2.5a1 1 0 10-1.4 1.4l3.2 3.2c.4.4 1 .4 1.4 0L9 14.1a1 1 0 10-1.4-1.4L5 15.2z"
      }
    })]);
  }
};