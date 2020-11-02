import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagIlRoundIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 512 512"
      },
      "class": "c-ficon c-ficon--flag.il.round"
    }, ctx.data]), [h("circle", {
      attrs: {
        cx: "256",
        cy: "256",
        fill: "#eee",
        r: "256"
      }
    }), h("path", {
      attrs: {
        d: "m352.4 200.3h-64.4l-32-55.6-32.1 55.6h-64.3l32.1 55.7-32 55.7h64.2l32.1 55.6 32.1-55.6h64.3l-32.1-55.7 32-55.7zm-57 55.7-19.7 34.2h-39.4l-19.8-34.2 19.8-34.2h39.4l19.8 34.2zm-39.4-68.4 7.3 12.7h-14.6zm-59.2 34.2h14.7l-7.4 12.7zm0 68.4 7.3-12.7 7.4 12.7zm59.2 34.2-7.3-12.7h14.6zm59.2-34.2h-14.7l7.4-12.7zm-14.7-68.4h14.7l-7.3 12.7zm114.9-166.1h-318.8a257.3 257.3 0 0 0 -59 66.7h436.8a257.3 257.3 0 0 0 -59-66.7zm-318.8 400.6h318.8a257.3 257.3 0 0 0 59-66.7h-436.8a257.3 257.3 0 0 0 59 66.7z",
        fill: "#0052b4"
      }
    })]);
  }
};