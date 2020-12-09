import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'BagIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 16 21"
      },
      "class": "c-ficon c-ficon--bag"
    }, ctx.data]), [h("path", {
      attrs: {
        "fill-rule": "evenodd",
        d: "M14.7 6L16 4.9v13.3a3 3 0 01-3 2.9H3a3 3 0 01-3-3V4.9l1.3 1.3 1.4-1.3L4 6.1l.4-.4V3.3A2.9 2.9 0 017.3.6h1.4a2.9 2.9 0 012.9 2.9v2.3l.4.4 1.3-1.3 1.4 1.3zM5 11l-1 4h7l1-4H5zm2.3-8.7a1 1 0 00-1 1v2.4l.4.4L8 4.8l1.3 1.3.4-.4V3.3c0-.5-.4-1-1-1H7.3z"
      }
    })]);
  }
};