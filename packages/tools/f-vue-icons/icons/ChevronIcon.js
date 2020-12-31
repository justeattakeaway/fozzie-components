import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'ChevronIcon',
  props: {},
  functional: true,
  render: function render(h, ctx) {
    var attrs = ctx.data.attrs || {};
    ctx.data.attrs = attrs;
    return h("svg", _mergeJSXProps([{
      attrs: {
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 11.171582 6.5885787"
      },
      "class": "c-ficon c-ficon--chevron"
    }, ctx.data]), [h("path", {
      attrs: {
        "fill-rule": "evenodd",
        d: "m 0.29029267,0.29828979 a 1,1 0 0 1 1.41699993,0 l 3.876,3.87400011 3.8769996,-3.87800011 a 1,1 0 0 1 1.4170008,0 1,1 0 0 1 0,1.41700011 L 6.2942926,6.2942896 a 1,1 0 0 1 -1.417,0 L 0.29429267,1.7112899 a 1,1 0 0 1 -0.004,-1.41300011 z"
      }
    })]);
  }
};