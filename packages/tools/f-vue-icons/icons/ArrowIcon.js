import _mergeJSXProps from "babel-helper-vue-jsx-merge-props";
export default {
  name: 'ArrowIcon',
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
      "class": "c-ficon c-ficon--arrow"
    }, ctx.data]), [h("path", {
      attrs: {
        d: "M5 11h11.167l-4.708-4.71a1 1 0 010-1.418 1 1 0 011.417 0l6.417 6.417a1 1 0 010 1.417l-6.417 6.416a1 1 0 01-1.417 0 1 1 0 010-1.416L16.167 13H5a1 1 0 010-2z"
      }
    })]);
  }
};