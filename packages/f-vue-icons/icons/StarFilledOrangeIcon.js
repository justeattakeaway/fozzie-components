import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'StarFilledOrangeIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 14 13"
      },
      "class": "ficon ficon-star--filled--orange"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M9.18 3.98l4.2.6c.27.05.38.38.19.57l-3.05 2.96.72 4.16a.33.33 0 0 1-.48.36L7 10.66l-3.76 1.97a.33.33 0 0 1-.48-.36l.72-4.16L.43 5.15a.33.33 0 0 1 .19-.56l4.2-.61L6.7.18a.33.33 0 0 1 .6 0l1.88 3.8z",
        fill: "#FF5F37",
        "fill-rule": "evenodd"
      }
    })]);
  }
};