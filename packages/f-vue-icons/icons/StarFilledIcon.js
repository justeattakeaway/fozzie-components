import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'StarFilledIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 18 17"
      },
      "class": "ficon ficon-star-filled"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#D50525",
        "fill-rule": "evenodd",
        d: "M11.72 5.47l5.26.76c.34.05.47.47.23.71l-3.8 3.7.9 5.2c.05.34-.3.6-.61.44L9 13.82l-4.7 2.46a.42.42 0 0 1-.6-.44l.9-5.2-3.8-3.7a.42.42 0 0 1 .22-.7l5.26-.77L8.63.73a.42.42 0 0 1 .74 0l2.35 4.74z"
      }
    })]);
  }
};