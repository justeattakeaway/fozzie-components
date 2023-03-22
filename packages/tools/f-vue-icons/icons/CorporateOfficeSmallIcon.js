import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'CorporateOfficeSmallIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 12 12"
      },
      "class": "c-ficon c-ficon--corporate-office-small"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M10.4.1H1.6C1.2.1.8.3.5.6s-.4.6-.4 1v10.3h11.8V1.6c0-.4-.2-.8-.5-1.1-.2-.2-.6-.4-1-.4zm.2 10.5H6.7v-2H5.3v2H1.4v-9c0-.1 0-.1.1-.2s.1-.1.2-.1h8.8c.1 0 .1 0 .2.1 0 0 .1.1.1.2v9zm-3.7-7h1.8v1.3H6.9V3.6zm-3.5 0h1.8v1.3H3.4V3.6zm3.5 2.6h1.8v1.3H6.9V6.2zm-3.5 0h1.8v1.3H3.4V6.2z",
        fill: "#242e30"
      }
    })]);
  }
};