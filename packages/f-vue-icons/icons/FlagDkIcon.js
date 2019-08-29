import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'FlagDkIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 640 480"
      },
      "class": "ficon ficon-flag.dk"
    }, ctx.data]), [h("path", {
      attrs: {
        fill: "#c60c30",
        d: "M0 0h640.1v480H0z"
      }
    }), h("path", {
      attrs: {
        fill: "#fff",
        d: "M205.714 0h68.57v480h-68.57z"
      }
    }), h("path", {
      attrs: {
        fill: "#fff",
        d: "M0 205.714h640.1v68.57H0z"
      }
    })]);
  }
};